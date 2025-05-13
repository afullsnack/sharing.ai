
import { createFileRoute } from '@tanstack/react-router'
import { observer } from '@legendapp/state/react'
import { Section } from '@/components/craft'

export const Route = createFileRoute('/_authed/~/test')({
  component: observer(TestComp),
})

function TestComp() {
  // const params = Route.useParams()
  // console.log(params.id, ':::id param')
  return (
    <Section className='!p-0'>
      <div>Test component</div>
    </Section>
  )
}
