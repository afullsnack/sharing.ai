// app/routes/index.tsx
import * as fs from 'fs'
import { createFileRoute, useRouter, Outlet } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/craft'
// import { observable } from "@legendapp/state"
import { useObservable, observer, useObserve } from "@legendapp/state/react"

const filePath = 'count.txt'

async function readCount() {

  const count = await fs.promises.readFile(filePath, 'utf-8').catch((reason) => {
    console.log(reason, ":::catch reason")
    return '0'
  });
  console.log(count, ":::server state")
  return parseInt(
    count
  )
}

export const getCount = createServerFn('GET', (_, { request }) => {
  "use server"
  const forwardedFor = request.headers.get('X-Forwarded-For');

  if(forwardedFor && typeof forwardedFor === 'string') {
    console.log(forwardedFor, ":::user IP")
    console.log(forwardedFor.split(',')[0].trim(), ":::trimed IP")
  }

  return readCount()
})

const updateCount = createServerFn('POST', async (addBy: number) => {
  "use server"

  const count = await readCount()
  await fs.promises.writeFile(filePath, (count + addBy).toString())
})

export const Route = createFileRoute('/')({
  component: observer(Home),
  loader: async () => await getCount(),
  preload: true,
})


/**
* Track login state of user/gues
* Render landing page
* Start generation flow based on mode
*/


function Home () {
  const router = useRouter()
  const state = Route.useLoaderData()
  const count = useObservable(state)

  useObserve(count, () => {
    console.log(count.get(), ":::count updated")
  })

  return (
    <Section>
      <Container>
        <Button
          onClick={() => {
            updateCount(1).then(() => {
              router.invalidate()
            })
          }}
          size={"lg"}
          className="rounded-lg"
        >
          Add 1 to {state}?
        </Button>
      </Container>
      <Container>
        <h1>CLient state on load {count.get()}</h1>
        <Button onClick={() => count.set(_count => _count + 1)}>Only update client</Button>
      </Container>
    </Section>
  )
}
