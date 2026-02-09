import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Lädt Umgebungsvariablen (wie API_KEY) basierend auf dem Modus (development/production)
  // Das dritte Argument '' sorgt dafür, dass alle Variablen geladen werden, nicht nur die mit VITE_ Prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    build: {
      // Erhöht das Limit für die Warnung, um "Adjust chunk size limit" zu beheben
      chunkSizeWarningLimit: 1000,
    },
    define: {
      // Definiert process.env als Objekt, um Abstürze im Browser zu verhindern ("process is not defined")
      // und injiziert den API-Key sicher.
      'process.env': {
        API_KEY: env.API_KEY
      }
    }
  };
});