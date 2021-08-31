import { Typography } from "@material-ui/core";

export default function PrevSetCard({set}) {
	return (
		<div style={{marginRight: "1em", textAlign: "center"}}>
			<Typography>{set.reps}</Typography>
			<Typography>{set.weight}</Typography>
		</div>
	)
}
