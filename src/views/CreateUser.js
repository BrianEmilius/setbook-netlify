import { Button, Container, FormGroup, TextField } from "@material-ui/core"
import axios from "axios"

export default function CreateUser() {
	async function handleSubmit(e) {
		e.preventDefault()

		try {
			var response = await axios.post("/.netlify/functions/create-user", JSON.stringify({
				email: e.target.email.value,
				password: e.target.password.value
			}))
			console.log(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<FormGroup>
					<TextField type="email" name="email" label="Email address" required />
					<TextField type="password" name="password" label="Password" required />
				</FormGroup>
				<Button type="submit" variant="contained" color="primary">Create account</Button>
			</form>
		</Container>
	)
}
