import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";

export default function SetTable({ date, sets }) {
	return (
		<TableContainer>
			<Table style={{ display: "flex" }}>
				<thead>
					<TableRow style={{ display: "flex", flexDirection: "column" }}>
						<TableCell>{new Date(date).toLocaleString("default", { day: "numeric", month: "short" })}</TableCell>
						<TableCell>Reps</TableCell>
						<TableCell>Weight</TableCell>
					</TableRow>
				</thead>
				<TableBody style={{ display: "flex" }}>
					{sets?.map((set, i) => (
						<TableRow key={i} style={{ display: "flex", flexDirection: "column" }}>
							<TableCell>#{i + 1}</TableCell>
							<TableCell>{set.reps}</TableCell>
							<TableCell>{set.weight}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
