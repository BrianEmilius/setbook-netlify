import { Button, Container, FormGroup, Typography, TextField, Card } from "@material-ui/core";
import { Link } from "@reach/router";
import axios from "axios";
import { useState } from "react";
import { useContext, useEffect } from "react";
import ApplicationBar from "../components/AppBar";
import TokenContext from "../contexts/TokenContext";

export default function Home() {
	var [token] = useContext(TokenContext)
	var [exercises, setExercises] = useState([])

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

		setExercises([...exercises, response.data.ops[0]])
		console.log(response.data.ops[0])
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
				<form onSubmit={handleSubmit}>
					<FormGroup>
						<TextField type="text" name="exercise" label="Create a new exercise" />
					</FormGroup>
					<Button type="submit" variant="contained" color="primary">Create</Button>
				</form>
				{exercises.map(exercise => (
					<Card key={exercise._id} style={{ padding: ".5em 1em", marginBottom: ".5em" }}>
						<Typography variant="body1">
							<Link to={`/runset/${exercise._id}`}>{exercise.title}</Link>
						</Typography>
					</Card>
				))}
			</Container>
		</>
	)
}