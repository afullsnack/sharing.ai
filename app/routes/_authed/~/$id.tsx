import { createFileRoute } from '@tanstack/react-router'
import { observer } from '@legendapp/state/react'
import LandingLayout from '@/components/landing-layout'
import { Section } from '@/components/craft'

export const Route = createFileRoute('/_authed/~/$id')({
  component: observer(Spndl),
})

function Spndl() {
  const params = Route.useParams()
  console.log(params.id, ':::id param')
  return (
    <LandingLayout>
      <Section className='!p-0'>
        <div>SpndleId: {JSON.stringify({ spndl_id: params.id }, null, 4)}</div>
      </Section>
    </LandingLayout>
  )
}
