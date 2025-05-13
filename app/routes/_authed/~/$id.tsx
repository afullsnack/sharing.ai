import { createFileRoute } from '@tanstack/react-router'
import { observer } from '@legendapp/state/react'
import { Section } from '@/components/craft'

export const Route = createFileRoute('/_authed/~/$id')({
  component: observer(Spndl),
})

function Spndl() {
  const params = Route.useParams()
  console.log(params.id, ':::id param')
  return (
      <Section className=''>
        <div>SpndleId: {JSON.stringify({ spndl_id: params.id }, null, 4)}</div>
      </Section>
  )
}
