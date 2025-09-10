import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

export default {
  plugins: [
    react(),
    visualizer({
      filename: "dist/stats.html",
      open: true, // opens report in browser after build
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // raises warning threshold
  },
};
