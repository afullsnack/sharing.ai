// app/routes/__root.tsx
import { createRootRoute } from '@tanstack/react-router'
import { Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import * as React from "react"
// @ts-ignore
import appCss from "@/styles/globals.css?url"
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster' 

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      title: 'Test application',
    },
  ],
  links: () => [
    { rel: 'stylesheet', href: appCss }
  ],
  component: RootComponent,
  notFoundComponent: () => (<div>Not found</div>)
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html lang='en'>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
        <TanStackRouterDevtools position="bottom-right" />
      </Body>
    </Html>
  )
}
