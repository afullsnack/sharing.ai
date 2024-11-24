import { createFileRoute, redirect } from '@tanstack/react-router'

// TODO: implement route guards
export const Route = createFileRoute('/_authed')({
  beforeLoad: () => {
    const isFalse = Math.random() * 100
    if (!true) {
      throw redirect({ to: '/' })
    }
  },
})
