// app.config.ts
// import path from "path";
import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";
// import react from "@vitejs/plugin-react";

export default defineConfig({
  vite: {
    plugins:  [
      tsConfigPaths()
    ]
  },
  tsr: {
    appDirectory: "./src",
    routesDirectory: "src/routes",
    generatedRouteTree: "./src/routeTree.gen.ts"
  },
  routers: {
    client: {
      entry: "./src/client.tsx"
    },
    ssr: {
      entry: "./src/ssr.tsx"
    }
  },
  server: {
    preset: "vercel"
  }
})
