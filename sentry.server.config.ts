// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: "https://78485e6faf7097cfa856e2ed7b0d9f1f@o4507974939836416.ingest.us.sentry.io/4509054153588736",

	// v11 は未指定だと cookie やリクエスト本文も送る。v10 の収集範囲を維持する。
	dataCollection: {
		userInfo: false,
		cookies: false,
		httpHeaders: {
			request: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
			response: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
		},
		httpBodies: [],
		urlQueryParams: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
		genAI: { inputs: false, outputs: false },
		databaseQueryData: false,
		graphQL: { document: false, variables: false },
	},

	// Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
	tracesSampleRate: 1,

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,
});
Sentry.setTag("frontend", false);
Sentry.setAttribute("frontend", false);
Sentry.setTag("NEXT_PUBLIC_STAGE", process.env.NEXT_PUBLIC_STAGE);
if (process.env.NEXT_PUBLIC_STAGE) {
	Sentry.setAttribute("NEXT_PUBLIC_STAGE", process.env.NEXT_PUBLIC_STAGE);
}
