// app.config.ts
import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  vite: {
    plugins:  [
      tsConfigPaths({
        projects: ['./tsconfig.json']
      }),
    ]
  },
  // tsr: {
  //   appDirectory: "./src",
  //   routesDirectory: "./src/routes",
  //   generatedRouteTree: "./src/routeTree.gen.ts"
  // },
  // routers: {
  //   client: {
  //     entry: "./src/client.tsx"
  //   },
  //   ssr: {
  //     entry: "./src/ssr.tsx"
  //   }
  // },
  server: {
    preset: "vercel",
    // prerender: {
    //   routes: ['/'],
    //   crawlLinks: true
    // }
    // output: {
    //   dir: "dist",
    //   serverDir: "dist/server"
    // }
  }
})
