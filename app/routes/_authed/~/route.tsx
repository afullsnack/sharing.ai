import SpndlLayout from "@/components/spndl-layout"
import { createFileRoute, Outlet } from "@tanstack/react-router"


export const Route = createFileRoute('/_authed/~')({
  component: SpinLayout
})

function SpinLayout() {

  return (
    <SpndlLayout>
      <Outlet />
    </SpndlLayout>
  )
}
