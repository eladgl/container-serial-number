import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inspector from 'vite-plugin-react-inspector';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-styled-components', { displayName: true }]
        ]
      }
    }),
    // inspector()
  ]
});
