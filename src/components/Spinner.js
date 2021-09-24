import { FitnessCenter } from "@material-ui/icons";
import "./Spinner.scss"

export default function Spinner() {
	return (
		<p className="spinner">
			<FitnessCenter className="spinner__icon" />
		</p>
	)
}