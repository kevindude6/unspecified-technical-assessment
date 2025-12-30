import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prisma } from "./lib/prisma.js";
import app from "./app.js";

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
