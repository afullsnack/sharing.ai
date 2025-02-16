// app/routes/__root.tsx
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import * as React from "react"
import appCss from "@/styles/globals.css?url"
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'
import { NotFound } from '@/components/not-found'
import { ThemeProvider } from '@/components/theme-provider'
import { Layout } from '@/components/craft'

export const Route = createRootRoute({
  head: () => ({
    meta: [
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
    links: [
      { rel: 'stylesheet', href: appCss }
    ],
    scripts: [
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

  }),
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
    <Layout>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme='dark' storageKey='spndle-ui-theme'>
          {children}
          <Toaster />
        </ThemeProvider>
        <Scripts />
        { /*process.env.NODE_ENV === "development" && <TanStackRouterDevtools position="bottom-right" />*/}
      </body>
    </Layout>
  )
}
