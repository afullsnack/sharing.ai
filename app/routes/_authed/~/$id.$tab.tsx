import { createFileRoute } from '@tanstack/react-router'
import { observer } from '@legendapp/state/react'
import { Section } from '@/components/craft'
import Chat from './-components/Chat'

export const Route = createFileRoute('/_authed/~/$id/$tab')({
  component: observer(Spndl),
})

function Spndl() {
  const params = Route.useParams()
  console.log(params, ':::params')

  if(params.tab === "chat") {
    return (
      <Section className='!p-0'>
        <Chat />
      </Section>
    )
  }
  
  return (
    <Section className='!p-0'>
      <pre>{JSON.stringify({ params }, null, 4)}</pre>
    </Section>
  )
}
