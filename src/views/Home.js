import { Button, Container, FormGroup, TextField, Card, Fab, Backdrop } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import axios from "axios"
import { useState } from "react"
import { useContext, useEffect } from "react"
import AccordionElement from "../components/AccordionElement"
import ApplicationBar from "../components/AppBar"
import TokenContext from "../contexts/TokenContext"
import Spinner from "../components/Spinner"

export default function Home() {
	var [token] = useContext(TokenContext)
	var [exercises, setExercises] = useState([])
	var [open, setOpen] = useState(false)
	var [isLoading, setIsLoading] = useState(true)

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
			.then(response => {
				setExercises(response.data)
				setIsLoading(false)
			})
	}, [token])

	return (
		<>
			<ApplicationBar />
			<Container>
				{isLoading ? <Spinner /> : exercises.map(exercise => <AccordionElement key={exercise._id} exercise={exercise} />)}
				<Fab color="primary" style={{ position: "fixed", right: "1em", bottom: "1em" }} onClick={() => setOpen(true)}>
					<Add />
				</Fab>
				<Backdrop open={open} style={{ zIndex: "5000" }}>
					<Card style={{ padding: "1em" }}>
						<form onSubmit={handleSubmit}>
							<FormGroup style={{ marginBottom: "1em" }}>
								<TextField type="text" name="exercise" label="Create a new exercise" />
							</FormGroup>
							<Button type="button" variant="contained" color="default" onClick={() => setOpen(false)}>Cancel</Button>
							<Button type="submit" variant="contained" color="primary">Create</Button>
						</form>
					</Card>
				</Backdrop>
			</Container>
		</>
	)
}