import { Box } from "@mui/material";
import Description from "@/components/Description";
import PlayerPlaylist from "../Player/PlayerPlaylist";
import type { Dispatch, SetStateAction } from "react";
import type { PlayerItem, PlayerPlaylist as PlaylistType } from "./types";

type PlayerInfoProps = {
	isMobile: boolean;
	isPlayerFullscreen: boolean;
	playerItem: PlayerItem;
	setPlayerItem: Dispatch<SetStateAction<PlayerItem | undefined>>;
	playerPlaylist?: PlaylistType;
	title?: string;
	author?: string;
	setIsFullscreen: (value: boolean) => void;
	width: number;
};

export default function PlayerInfo({
	isMobile,
	isPlayerFullscreen,
	playerItem,
	setPlayerItem,
	playerPlaylist,
	title,
	author,
	width,
}: PlayerInfoProps) {
	if (!isPlayerFullscreen) return null;

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
				display: isPlayerFullscreen ? "block" : "none",
				overflowY: "auto",
				maxHeight: "50vh",
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
			{playerItem?.node ? <Box>{playerItem?.node}</Box> : null}

			{/* 概要欄 */}
			<Box style={{ margin: "0.5em" }}>
				{isPlayerFullscreen && playerItem?.description && (
					<Description
						text={playerItem.description}
						date={playerItem?.publishedAt}
						maxLine={2}
					/>
				)}
			</Box>
			{/* モバイル用プレイリスト */}
			{isMobile && isPlayerFullscreen && (
				<PlayerPlaylist
					isFullscreen={isPlayerFullscreen}
					isMobile={isMobile}
					playerPlaylist={playerPlaylist}
					setPlayerItem={setPlayerItem}
				/>
			)}
		</Box>
	);
}
