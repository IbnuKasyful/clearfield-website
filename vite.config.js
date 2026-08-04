import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Absolute, not './' — the project detail routes (/projects/<id>) are nested,
  // so relative asset paths would resolve against the wrong directory. This
  // means the site must be served from the domain root.
  base: '/',
});
