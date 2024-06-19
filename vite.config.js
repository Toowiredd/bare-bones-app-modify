import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import daisyui from "daisyui";
import babel from '@vitejs/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: "8080",
  },
  plugins: [
    react(),
    babel({
      babelConfig: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
          ['@babel/plugin-transform-runtime', {
            regenerator: true
          }]
        ]
      }
    }),
    daisyui
  ],
  
});
