import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner";

import "./lib/i18n.ts";

// biome-ignore lint/style/noNonNullAssertion: its the root element
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
		<Toaster />
	</StrictMode>,
);
