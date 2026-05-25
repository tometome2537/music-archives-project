import { Avatar, Box, Chip } from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import type { MultiSearchBarSearchSuggestion } from "@/components/Navbar/SearchBar/MultiSearchBar";
import type { InputValue } from "@/components/Navbar/SearchBar/SearchBar";

type SearchBarExternalChipProps = {
	ids: Array<string>;
	searchSuggestion: MultiSearchBarSearchSuggestion[];
	setInputValue: Dispatch<SetStateAction<InputValue[]>>;
	onClick: () => void;
};

export default function searchBarExternalChip({
	ids,
	searchSuggestion,
	setInputValue,
	onClick,
}: SearchBarExternalChipProps) {
	// チップクリックハンドラー
	const handleChipClick = (id: string) => {
		const suggestion = searchSuggestion.find(
			(item) => item.value === id || item.label === id,
		);

		if (suggestion) {
			const value: InputValue = {
				...suggestion,
				createdAt: new Date(),
				sort: suggestion.sort || 99,
			};

			setInputValue([value]);
		}

		onClick();
	};

	return (
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
			{ids.map((id) => {
				const r = searchSuggestion.find((item) => item.value === id);
				const label = r?.label ?? "?";
				const imgSrc = r?.imgSrc;
				return (
					<Chip
						key={id}
						variant="outlined"
						sx={{
							"& .MuiChip-label": {
								maxWidth: "100%",
								whiteSpace: "nowrap",
								textOverflow: "ellipsis",
							},
						}}
						avatar={
							imgSrc ? (
								<Avatar alt={label} src={imgSrc} />
							) : (
								<Avatar>{label[0]}</Avatar>
							)
						}
						label={label}
						color="success"
						onClick={() => handleChipClick(id)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								e.currentTarget.click();
							}
						}}
					/>
				);
			})}
		</Box>
	);
}
