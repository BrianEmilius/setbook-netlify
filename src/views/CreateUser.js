import { Button, Container, FormGroup, TextField, Typography, Snackbar } from "@material-ui/core"
import { Link } from "@reach/router"
import axios from "axios"
import { useState } from "react"
import BgImg from "../splash-image-lg.jpg"

export default function CreateUser() {
	var [open, setOpen] = useState(false)
	var [snackbarMessage, setSnackbarMessage] = useState("")

	function handleClose() {
		setOpen(false)
	}

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			var response = await axios.post("/.netlify/functions/create-user", JSON.stringify({
				email: e.target.email.value,
				password: e.target.password.value
			}))
			console.log(response.data)
		} catch (error) {
			setSnackbarMessage("This account already exists")
			setOpen(true)
			console.error(error)
		}
	}

	return (
		<Container style={{ backgroundImage: `url(${BgImg})`, backgroundSize: "cover", backgroundPositionX: "75%", width: "100vw", height: "100vh", display: "grid", alignItems: "center" }}>
			<form onSubmit={handleSubmit}>
				<Typography style={{color: "white"}}>Create New Account</Typography>
				<FormGroup>
					<TextField type="email" name="email" label="Email address" variant="filled" style={{ backgroundColor: "white" }} required />
					<TextField type="password" name="password" label="Password" variant="filled" style={{ backgroundColor: "white" }} required />
				</FormGroup>
				<Button type="submit" variant="contained" color="primary" style={{width:"100%"}}>Create account</Button>
				<Typography style={{color: "white"}}><Link to="/">Oops, take me back</Link></Typography>
			</form>
			<Snackbar open={open} message={snackbarMessage} autoHideDuration={5000} onClose={handleClose} />
		</Container>
	)
}
