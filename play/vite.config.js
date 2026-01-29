import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "easy-elplus": path.resolve(__dirname, "../dist/easy-elplus")
    }
  }
})
