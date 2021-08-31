import { Button, Container, FormGroup, TextField } from "@material-ui/core"
import { navigate } from "@reach/router"
import axios from "axios"
import { useContext } from "react"
import TokenContext from "../contexts/TokenContext"
import BgImg from "../splash-image-lg.jpg"

export default function LogIn() {
	var setToken = useContext(TokenContext)[1]

	async function handleSubmit(e) {
		e.preventDefault()

		var response = await axios.post("/.netlify/functions/token", JSON.stringify({
			email: e.target.email.value,
			password: e.target.password.value
		}))

		setToken(response.data)
		navigate("/home")
	}

	return (
		<Container style={{backgroundImage: `url(${BgImg})`, backgroundSize: "cover", width: "100vw", height: "100vh", display: "grid", alignItems:"center"}}>
			<form onSubmit={handleSubmit}>
				<FormGroup>
					<TextField type="email" name="email" label="Email address" variant="filled" style={{backgroundColor: "white"}} required />
					<TextField type="password" name="password" label="Password" variant="filled" style={{backgroundColor: "white"}} required />
				</FormGroup>
				<Button type="submit" variant="contained" color="primary">Log in</Button>
			</form>
		</Container>
	)
}