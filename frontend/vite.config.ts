/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    port: 5173, // you can replace this port with any port
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage:{
      provider: "v8",
      reporter: ["text"],
      exclude: [
        "./src/main.tsx",
        "./*.config.*",
        "./src/vite-env.d.ts",
        "./src/App.tsx",
        "./src/pages/**/*",
        "./src/components/**/*",
      ],
    },
  }
})


  