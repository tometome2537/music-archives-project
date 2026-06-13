import { Box } from "@mui/material";
import Description from "@/components/Description";
import type { PlayerItem } from "./types";

type PlayerInfoProps = {
	isFullscreen: boolean;
	playerItem?: PlayerItem;
	title?: string;
	author?: string;
	setIsFullscreen: (value: boolean) => void;
	width: number;
};

export default function PlayerInfo({
	isFullscreen,
	playerItem,
	title,
	author,
	width,
}: PlayerInfoProps) {
	if (!isFullscreen) return null;

	const displayTitle = playerItem?.title || title;
	const displayAuthor = (playerItem?.author || author || "").replace(
		" - Topic",
		"",
	);

	return (
		<Box
			sx={{
				width: width,
				maxWidth: "100%",
				margin: "0 auto",
				display: isFullscreen ? "block" : "none",
				overflowY: "auto",
				maxHeight: "50vh",
				paddingBottom: "40vh",
			}}
		>
			{/* 動画タイトル */}
			<h3
				style={{
					display: "block",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				{displayTitle}
			</h3>

			{/* チャンネル名 */}
			<p
				style={{
					display: "block",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				{displayAuthor}
			</p>

			{/* 概要欄の上に表示するnode */}
			{playerItem?.node ? (
				<Box
					style={{
						display: "flex",
						padding: "8 auto",
						justifyContent: "center",
						alignItems: "center",
						flexWrap: "wrap",
						gap: "10px",
					}}
				>
					{playerItem?.node}
				</Box>
			) : null}

			{/* 概要欄 */}
			<Box style={{ margin: "0.5em" }}>
				{isFullscreen && playerItem?.description && (
					<Description
						text={playerItem.description}
						date={playerItem?.publishedAt}
						maxLine={2}
					/>
				)}
			</Box>
		</Box>
	);
}
