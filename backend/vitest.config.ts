import { configDefaults, defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
	test: {
		environment: "node",
		globals: true,
		setupFiles: ["./src/test-setup.ts"],
		fileParallelism: false,
		include: ["./src/**/*.test.ts"],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
