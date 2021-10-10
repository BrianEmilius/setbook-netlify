import { Button, Container, FormGroup, TextField, Card, Fab, Backdrop } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import axios from "axios"
import { useState } from "react"
import { useContext, useEffect } from "react"
import AccordionElement from "../components/AccordionElement"
import ApplicationBar from "../components/AppBar"
import TokenContext from "../contexts/TokenContext"
import Spinner from "../components/Spinner"
import "./Home.scss"

export default function Home() {
	var [token] = useContext(TokenContext)
	var [exercises, setExercises] = useState([])
	var [open, setOpen] = useState(false)
	var [isLoading, setIsLoading] = useState(true)
	var [results, setResults] = useState([])

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
				setResults(response.data)
				setIsLoading(false)
			})
	}, [token])

	function filter(e) {
		var keyword = e.target.value.toLowerCase()

		var temp = exercises.filter(exercise => exercise.title.toLowerCase().includes(keyword))
		setResults(temp)
	}

	return (
		<>
			<ApplicationBar />
			{isLoading ? <Spinner /> : <Container className="viewContainer">
				<TextField variant="filled" label="Search" onChange={filter} autoComplete="off" className="searchField" />
				{results.map(exercise => <AccordionElement key={exercise._id} exercise={exercise} />)}
				<Fab className="fab" onClick={() => setOpen(true)}>
					<Add />
				</Fab>
				<Backdrop open={open} className="backdrop">
					<Card className="backdrop__modal">
						<form onSubmit={handleSubmit}>
							<FormGroup style={{ marginBottom: "1em" }}>
								<TextField type="text" name="exercise" label="Create a new exercise" />
							</FormGroup>
							<div className="btnGroup">
								<Button className="btn--cancel" type="button" variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
								<Button className="btn--submit" type="submit" variant="contained">Create</Button>
							</div>
						</form>
					</Card>
				</Backdrop>
			</Container>}
		</>
	)
}