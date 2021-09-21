import { HourglassEmpty } from "@material-ui/icons";
import "./Spinner.css"

export default function Spinner() {
	return (
		<p style={{width: "100%", textAlign: "center", lineHeight: "40em"}}>
			<HourglassEmpty className="spinner" />
		</p>
	)
}