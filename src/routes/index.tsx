// app/routes/index.tsx
import * as fs from 'fs'
import { createFileRoute, useRouter, Outlet } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { Button } from '@/components/ui/button'
import { Container, Main, Section } from '@/components/craft'
// import { observable } from "@legendapp/state"
import { useObservable, observer, useObserve } from "@legendapp/state/react"
import { Card, CardContent } from '@/components/ui/card'
import { RefreshCcw } from 'lucide-react'

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

  if (forwardedFor && typeof forwardedFor === 'string') {
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


function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()
  const count = useObservable(state)

  useObserve(count, () => {
    console.log(count.get(), ":::count updated")
  })

  return (
    <Main>
      <Section>
        <Container className='grid space-y-3'>
          <h1 className='text-2xl md:text-3xl m-0 lg:text-5xl md:max-w-md lg:max-w-lg text-balance font-bold text-left dark:text-white font-sans tracking-tight'>
            Create sharable and lead generating links, with AI.
          </h1>
          <span className='text-balance text-lg md:text-xl lg:text-2xl md:max-w-md lg:max-w-lg'>Use one of the prompts below to begin creating your lead generating links</span>
        </Container>
        <Container className='grid grid-cols-4 gap-3 !py-2'>
          {
            [
              'Generate images and links for a sneaker shop',
              'Suggest captions for a home made chef recipe business',
              'Create a schedule for posting product links to whatsapp, twitter and instagram',
              'How can I create engaging and lead generating links for my business'
            ].map((v, index) => (
              <Card key={index}>
                <CardContent className='py-4'>
                  <p className='text-sm md:text-[12px] text-balance leading-relaxed font-sans font-light lg:text-[14px] tracking-tight text-left'>{v}</p>
                </CardContent>  
              </Card>
            ))
          }
          <div className='col-span-4'>
            <Button className='flex gap-2 items-center' variant={"link"}>
              <RefreshCcw className='size-6 text-black' />
              Refresh Prompts
            </Button>
          </div>
        </Container>
      </Section>
    </Main>
  )
}
