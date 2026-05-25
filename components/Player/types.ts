export enum PlayerType {
	YouTube = "YouTube",
	AppleMusic = "AppleMusic",
}

export type PlayerItem = {
	type?: PlayerType;
	mediaId?: string; // YouTubeの場合はvideoId。AppleMusicの場合はID
	title?: string;
	author?: string;
	short?: boolean;
	description?: string;
	viewCount?: number;
	channelId?: string;
	publishedAt?: Date;
	duration?: number;
	arWidth?: number; // 画面比率の幅
	arHeight?: number; // 画面比率の高さ
	node?: React.ReactNode;
};

export type PlayerPlaylist = {
	title?: string;
	videos: PlayerItem[];
};
