import { Container } from "@material-ui/core"
import ApplicationBar from "../components/AppBar"


export default function Settings() {
	return (
		<>
			<ApplicationBar back="/home" />
			<Container>
				settings
			</Container>
		</>
	)
}
