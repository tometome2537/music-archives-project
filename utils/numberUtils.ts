/**
 * 視聴回数を日本語の読みやすい形式（万、億など）にフォーマットする
 * @param viewCount 視聴回数
 * @returns フォーマットされた文字列 (例: "9999回", "1.5万回", "10万回", "1.5億回")
 */
export function formatViewCount(viewCount: number): string {
	if (viewCount < 0) {
		return `${viewCount}回`;
	}

	if (viewCount < 10000) {
		return `${viewCount}回`;
	}

	if (viewCount < 100000000) {
		// 1億未満
		const tenThousand = viewCount / 10000;
		if (viewCount < 100000) {
			// 1万以上10万未満は小数点第1位まで表示（端数が0なら整数表記）
			const rounded = Math.floor(tenThousand * 10) / 10;
			return `${rounded}万回`;
		}
		// 10万以上は整数表記
		return `${Math.floor(tenThousand)}万回`;
	}

	// 1億以上
	const hundredMillion = viewCount / 100000000;
	if (viewCount < 1000000000) {
		// 1億以上10億未満は小数点第1位まで表示（端数が0なら整数表記）
		const rounded = Math.floor(hundredMillion * 10) / 10;
		return `${rounded}億回`;
	}
	// 10億以上は整数表記
	return `${Math.floor(hundredMillion)}億回`;
}
