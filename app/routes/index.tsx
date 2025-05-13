// app/routes/index.tsx

import { createFileRoute, Link } from '@tanstack/react-router'
// import { createServerFn } from '@tanstack/start'
import { Container, Section } from '@/components/craft'
// import { observable } from "@legendapp/state"
import { useObservable, observer } from "@legendapp/state/react"
import { Card, CardContent } from '@/components/ui/card'
import { BrainCircuit, Sparkle } from 'lucide-react'
import PromptForm from '@/components/forms/prompt'
import { WobbleCard } from '@/components/ui/wobble-card'
import LandingLayout from '@/components/landing-layout'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import WaitlistDialog from '@/components/WaitlistDialog'
import { toast } from '@/hooks/use-toast'
import { CustomEvents, subscribe, unsubscribe } from '@/lib/events'
import { useEffect } from 'react'
import {
  useSession
} from "@clerk/tanstack-start"
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: observer(Home),
  errorComponent: () => (<h1>An error occured, contact support</h1>),
  onCatch(error, errorInfo) {
    console.log(error, errorInfo, ":::error and errorInfo");
  },
  onError(error) {
    console.log(error, ":::error_onError")
  },
  // loader: async () => await getCount(),
})


/**
* Track login state of user/guest
* Render landing page
* Start generation flow based on mode
*/


function Home() {
  // const router = useRouter()
  // const state = Route.useLoaderData()
  const openWaitlistDialog = useObservable<boolean>(false)
  const defaultPrompt = useObservable<string>()
  const session = useSession()
  console.log('Session', session)

  const handlePromptSubmit = () => {
    openWaitlistDialog.set(true);
  }

  useEffect(() => {
    subscribe(CustomEvents.ShowWaitlistDialog, () => openWaitlistDialog.set(true));

    return () => {
      unsubscribe(CustomEvents.ShowWaitlistDialog, () => openWaitlistDialog.set(false));
    }
  }, [])

  return (
    <LandingLayout>
      <Section className='!p-0'>
        <Container className='grid gap-2'>
          <h1 className='text-2xl md:text-3xl !m-0 lg:text-5xl md:max-w-md lg:max-w-lg text-balance font-bold text-left font-sans tracking-tight bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-900 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]'>
            Create shareable, lead generating short links with AI.
          </h1>
          <span className='text-balance text-lg md:text-lg lg:text-xl md:max-w-md lg:max-w-lg'>Use one of the prompts below to begin creating your links</span>
          {
            session.session && (
              <div>
                <Link to='/~/$id/$tab' params={{ id: 'spndl_sdonosdvobobosdbvo', tab: 'chat' }}>
                  <Button>Go to dashboard/spndls</Button>
                </Link>
              </div>
            )
          }
        </Container>
        <Container className='!py-2'>
          <Carousel opts={{
            align: "start",
            loop: true,
          }}>
            <CarouselContent className='flex items-stretch'>
              {
                [
                  'Create a product link from uploaded image',
                  'Create a link to collect payments, crypto or fiat',
                  'Collect product engagement data in a form',
                  'Create a simple page with social media links'
                ].map((v, index) => (
                  <CarouselItem onClick={() => {
                    console.log('Prompt value', v, index)
                    defaultPrompt.set(v)
                  }} key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/3 h-full hover:cursor-pointer">
                    <Card key={index} className='h-full dark:bg-background'>
                      <CardContent className='md:p-3 p-2 px-4 lg:px-6 rounded-md h-full grid items-start justify-between aspect-video'>
                        <Sparkle className='size-3' />
                        <p className='text-sm md:text-[10px] leading-relaxed font-sans font-light lg:text-[12px] tracking-tight text-left text-balance'>{v}</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))
              }
            </CarouselContent>
            <CarouselPrevious className='hidden md:flex' />
            <CarouselNext className='hidden md:flex' />
          </Carousel>
        </Container>
        {/*<Container className='!py-2'>
          <div className=''>
            <Button className='flex gap-2 items-center' variant={"link"}>
              <RefreshCcw className='size-6 text-black dark:text-white' />
              Refresh Prompts
            </Button>
          </div>
        </Container>*/}
        <Container>
          <PromptForm onPromptSubmit={handlePromptSubmit} promptValue={defaultPrompt.get()} />
          <WaitlistDialog
            open={openWaitlistDialog.get()}
            setIsOpen={(open) => openWaitlistDialog.set(open)}
            handleWaitlistSubmit={async () => {
              openWaitlistDialog.set(false);
              toast({
                title: "Added to waitlist",
                description: "You have been subscribed to our product waitlist."
              });
            }}
          />
        </Container>
      </Section>

      <Section className='mt-6 lg:mt-1'>
        <Container className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full md:px-0">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Generative AI powered captions.
              </h2>
              <p className="mt-4 text-left  text-base/6 text-neutral-200">
                Leverage generative AI to create engaging captions and SEO optimizations for your links.
              </p>
            </div>
            <BrainCircuit className='size-36 text-white absolute z-50 grayscale filter  lg:-right-[5%] bottom-10' />
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px]">
            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              No more broken links.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              Stop loosing leads and prospects over dead or broken links.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Real time, useful insights into user behaviour
              </h2>
              <p className="mt-4 max-w-[24rem] text-left  text-base/6 text-neutral-200">
                Track real time metrics and click through rate, as users interact with your links. Get useful overview of all data.
              </p>
            </div>
            <img
              src="/analytics.png"
              width={500}
              height={500}
              alt="analytics tracking image"
              className="absolute -right-[30%] md:-right-[40%] lg:-right-[28%] -bottom-[40%] object-contain rounded-2xl"
            />
          </WobbleCard>
        </Container>
      </Section>
    </LandingLayout>
  )
}
