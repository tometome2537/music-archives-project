import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cookies } from "next/headers";
import { ApiDataProvider } from "@/contexts/ApiDataContext";
import { AppleMusicProvider } from "@/contexts/AppleMusicContext";
import { BrowserInfoProvider } from "@/contexts/BrowserInfoContext";
import { type ColorModeChoice, ThemeRegistry } from "@/contexts/ThemeContext";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

// const title = "ミュージックアーカイブスプロジェクト";
const title = "ぷらそにかアーカイブス";
const description =
	"ぷらそにかアーカイブス - YouTubeチャンネル「ぷらそにか」の動画を詳細な検索機能、YouTubeの再生を提供します。";

export const metadata: Metadata = {
	metadataBase: new URL("https://music-archives-project.vercel.app"),
	title: title,
	description: description,
	keywords: [
		"ぷらそにか",
		"アーカイブス",
		"YouTube",
		"音楽",
		"AppleMusic",
		"YouTubeMusic",
	],
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
	openGraph: {
		title: title,
		description: description,
		url: "music-archives-project.vercel.app",
		siteName: title,
		type: "website",
		images: [
			{
				url: "/twitter_card.png",
				width: 1600,
				height: 900,
				alt: title,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MusicArchPJ",
		title: title,
		description: description,
		images: ["/twitter_card.png"],
	},
	verification: {
		google: "0ERg8PZXOGMCKiCI-c-8BqDFTWZrUGbGI0SmzXBmiOo",
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const preColorMode = (await cookies()).get("colorMode")?.value;
	const initColorMode: ColorModeChoice =
		preColorMode === "light" || preColorMode === "dark"
			? preColorMode
			: "device";

	return (
		<html lang="ja">
			<head>
				{process.env.NEXT_PUBLIC_STAGE !== "dev" && (
					<GoogleAnalytics gaId="G-EGPYKGH18H" />
				)}
			</head>
			<body className={geistSans.variable}>
				<AppRouterCacheProvider options={{ key: "mui", prepend: true }}>
					<ThemeRegistry initColorMode={initColorMode}>
						<AppleMusicProvider>
							<ApiDataProvider>
								<BrowserInfoProvider>
									<CssBaseline />
									{children}
								</BrowserInfoProvider>
							</ApiDataProvider>
						</AppleMusicProvider>
					</ThemeRegistry>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
