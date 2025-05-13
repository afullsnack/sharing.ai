import { createFileRoute } from '@tanstack/react-router'
import { observer } from '@legendapp/state/react'
import { Section } from '@/components/craft'

export const Route = createFileRoute('/_authed/~/$id/$tab')({
  component: observer(Spndl),
})

function Spndl() {
  const params = Route.useParams()
  console.log(params, ':::params')
  return (
    <Section className='!p-0'>
      <pre>{JSON.stringify({ params }, null, 4)}</pre>
    </Section>
  )
}
