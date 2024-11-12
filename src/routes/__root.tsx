// app/routes/__root.tsx
import { createRootRoute } from '@tanstack/react-router'
import { Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import * as React from "react"
// @ts-ignore
import appCss from "@/styles/globals.css?url"
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster' 
import { NotFound } from '@/components/not-found'

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
      title: 'Spndle - Engaging links creation and management with AI',
    },
  ],
  links: () => [
    { rel: 'stylesheet', href: appCss }
  ],
  scripts: () => [
    {
      src: 'https://openpanel.dev/op1.js',
      async: true,
      defer: true,
    },
    {
      children: `
      window.op = window.op||function(...args){(window.op.q=window.op.q||[]).push(args);};
      window.op('init', {
        clientId: 'a784a560-6265-47cc-8543-bcf9552a42bb',
        trackScreenViews: true,
        trackOutgoingLinks: true,
        trackAttributes: true,
      });
      `,
    },
  ],
  component: RootComponent,
  notFoundComponent: NotFound
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
        {process.env.NODE_ENV === "development" && <TanStackRouterDevtools position="bottom-right" />}
      </Body>
    </Html>
  )
}
