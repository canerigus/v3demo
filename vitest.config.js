import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      silent: true,
      setupFiles: ["./src/test/setup.js"],
      clearMocks: true,
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath(new URL("./", import.meta.url)),
    },
    compilerOptions: {
      types: ["vite/client", "vitest"],
      isCustomElement: (tag) => {
        return tag.startsWith('v-') || tag.startsWith('vuetify-');
      },
    },
  })
);
