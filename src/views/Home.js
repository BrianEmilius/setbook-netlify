import { Button, Container, FormGroup, Typography, TextField, Card, Fab, Backdrop } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { Link } from "@reach/router"
import axios from "axios"
import { useState } from "react"
import { useContext, useEffect } from "react"
import ApplicationBar from "../components/AppBar"
import TokenContext from "../contexts/TokenContext"

export default function Home() {
	var [token] = useContext(TokenContext)
	var [exercises, setExercises] = useState([])
	var [open, setOpen] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault()
		var response = await axios.post("/.netlify/functions/create-exercise", JSON.stringify(
			{
				exercise: e.target.exercise.value
			}
		), {
			headers: {
				authorization: token
			}
		})

		setExercises([...exercises, response.data])
		e.target.exercise.value = ""
		setOpen(false)
	}

	useEffect(function () {
		axios.get("/.netlify/functions/get-exercises", {
			headers: {
				authorization: token
			}
		})
			.then(response => setExercises(response.data))
	}, [token])

	return (
		<>
			<ApplicationBar />
			<Container>
				{exercises.map(exercise => (
					<Card key={exercise._id} style={{ padding: ".5em 1em", marginBottom: ".5em" }}>
						<Typography variant="body1">
							<Link to={`/runset/${exercise._id}`}>{exercise.title}</Link>
						</Typography>
					</Card>
				))}
				<Fab color="primary" style={{ position: "fixed", right: "1em", bottom: "1em" }} onClick={() => setOpen(true)}>
					<Add />
				</Fab>
				<Backdrop open={open} style={{ zIndex: "5000" }}>
					<Card style={{padding: "1em"}}>
						<form onSubmit={handleSubmit}>
							<FormGroup style={{marginBottom: "1em"}}>
								<TextField type="text" name="exercise" label="Create a new exercise" />
							</FormGroup>
							<Button type="button" variant="contained" color="default" onClick={()=> setOpen(false)}>Cancel</Button>
							<Button type="submit" variant="contained" color="primary">Create</Button>
						</form>
					</Card>
				</Backdrop>
			</Container>
		</>
	)
}