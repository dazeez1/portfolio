import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Plugin order is not load-bearing here — the spike built this both ways and
// got a byte-identical stylesheet — but tailwind first reads more naturally.
export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
});
