import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { observer } from '@legendapp/state/react'

export const Route = createFileRoute('/_authed/~/$id')({
  component: observer(Spndl),
})

function Spndl() {
  const params = Route.useParams()
  console.log(params.id, ':::id param')
  return <div>SpndleId: {JSON.stringify({ spndl_id: params.id }, null, 4)}</div>
}
