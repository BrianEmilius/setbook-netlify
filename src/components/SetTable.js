import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import "./SetTable.scss"

export default function SetTable({ date, sets }) {
	return (
		<TableContainer>
			<Table className="table">
				<thead>
					<TableRow className="table__row">
						<TableCell className="table__cell">{new Date(date).toLocaleString("default", { day: "numeric", month: "short" })}</TableCell>
						<TableCell className="table__cell">Reps</TableCell>
						<TableCell className="table__cell">Weight</TableCell>
					</TableRow>
				</thead>
				<TableBody style={{ display: "flex" }}>
					{sets?.map((set, i) => (
						<TableRow key={i} className="table__row">
							<TableCell className="table__cell">#{i + 1}</TableCell>
							<TableCell className="table__cell">{set.reps}</TableCell>
							<TableCell className="table__cell">{set.weight}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
