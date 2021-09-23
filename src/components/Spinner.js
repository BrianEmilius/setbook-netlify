import { HourglassEmpty } from "@material-ui/icons";
import "./Spinner.scss"

export default function Spinner() {
	return (
		<p className="spinner">
			<HourglassEmpty className="spinner__icon" />
		</p>
	)
}