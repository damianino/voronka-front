import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('/etc/letsencrypt/live/xn--80aafhunugbapg.xn--p1ai/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/xn--80aafhunugbapg.xn--p1ai/fullchain.pem'),
    },
    host: '0.0.0.0', // optional: allow access from network
    port: 443,       // optional: or use another port
  }
})
