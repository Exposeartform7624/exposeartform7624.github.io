import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // This project is deployed at https://eclipsecl.github.io/ (user/organization site).
  base: '/',
  plugins: [react(), tailwindcss()],
});
