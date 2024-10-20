// app/routes/index.tsx
import * as fs from 'fs'
import { createFileRoute, useRouter, Outlet } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/craft'
import { useEffect, useState } from 'react'

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

export const getCount = createServerFn('GET', () => {
  "use server"

  return readCount()
})

const updateCount = createServerFn('POST', async (addBy: number) => {
  "use server"

  const count = await readCount()
  await fs.promises.writeFile(filePath, (count + addBy).toString())
})

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
  preload: true,
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()

  const [count, setCount] = useState(state ?? 0)
  // useEffect(() => {
  //   if (state && !count) {
  //     setCount(state);
  //   }
  // }, [])

  console.log(state, ":::initial state")

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
        <h1>CLient state on load {count}</h1>
        <Button onClick={() => setCount(_count => _count + 1)}>Only update client</Button>
      </Container>
    </Section>
  )
}
