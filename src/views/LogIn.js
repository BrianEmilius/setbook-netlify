import { Button, Container, FormGroup, TextField, Checkbox } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext } from "react"
import TokenContext from "../contexts/TokenContext"
import BgImg from "../splash-image-lg.jpg"

export default function LogIn() {
	var setToken = useContext(TokenContext)[1]
	var navigate = useNavigate()

	async function handleSubmit(e) {
		e.preventDefault()

		var response = await axios.post("/.netlify/functions/token", JSON.stringify({
			email: e.target.email.value,
			password: e.target.password.value
		}))

		setToken(response.data)

		if (e.target.rememberme.checked) {
			var date = new Date()
      date.setTime(date.getTime()+(30*24*60*60*1000)) // 30 days, same as token expiration
			document.cookie = `sb-token=${response.data}; expires=${date.toUTCString()}; path="/"`
		}

		navigate("/home")
	}

	return (
		<Container style={{backgroundImage: `url(${BgImg})`, backgroundSize: "cover", width: "100vw", height: "100vh", display: "grid", alignItems:"center"}}>
			<form onSubmit={handleSubmit}>
				<FormGroup>
					<TextField type="email" name="email" label="Email address" variant="filled" style={{backgroundColor: "white"}} required />
					<TextField type="password" name="password" label="Password" variant="filled" style={{backgroundColor: "white"}} required />
					<Checkbox label="Keep me logged in" style={{color: "white"}} name="rememberme" />
				</FormGroup>
				<Button type="submit" variant="contained" color="primary">Log in</Button>
			</form>
		</Container>
	)
}