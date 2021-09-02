import { Button, Container, Typography } from "@material-ui/core"
import { useState, useEffect, useContext } from "react"
import Record from "../components/Record"
import Timer from "react-compound-timer"
import axios from "axios"
import AppBar from "../components/AppBar"
import TokenContext from "../contexts/TokenContext"
import PrevSetCard from "../components/PrevSetCard"

export default function Home({exercise}) {
	var [inputFields, setInputFields] = useState([])
	var [running, setRunning] = useState(false)
	var [exerciseObject, setExercise] = useState([])
	var [prevSet, setPrevSet] = useState({})
	var [token] = useContext(TokenContext)

	function handleSubmit(e) {
		e.preventDefault()
		var data = {
			user: JSON.parse(token.split("~")[1]).data.id,
			date: Date.now(),
			exercise: exerciseObject._id,
			sets: inputFields
		}

		axios.post("/.netlify/functions/save-set", JSON.stringify(data), {
			headers: {
				authorization: token
			}
		})
			.then(response => console.log(response))
	}

	function addSet() {
		var values = [...inputFields, { start: Date.now(), end: 0, reps: 0, weight: 0 }]
		setInputFields(values)
		setRunning(true)
	}

	function stopSet() {
		setRunning(false)
		var values = [...inputFields]
		values[values.length - 1].end = Date.now()
		setInputFields(values)
	}

	function resetTimer() {
		if (!running) {
			addSet()
			return
		}

		stopSet()
		return
	}

	useEffect(function() {
		axios.get(`/.netlify/functions/get-exercise?id=${exercise}`,
		{
			headers: {
				authorization: token
			}
		})
			.then(res => setExercise(res.data))

		axios.get(`/.netlify/functions/get-previous-set?exercise=${exercise}`, {
			headers: {
				authorization: token
			}
		})
			.then(res => setPrevSet(res.data))
	}, [exercise, token])


	return (
		<div>
			<AppBar back="/home" />
			<form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"1em"}}>
				<Typography variant="h6" component="h1">{exerciseObject.title}</Typography>
				<Container style={{display: "flex"}}>
					{prevSet.sets ? 
					prevSet.sets.map((set, i) => <PrevSetCard key={i} set={set} />)
					: <Typography>You have not done this exercise before</Typography>}
				</Container>
				<div style={{display:"flex",overflowX:"scroll",margin:"1em 0",minHeight:"96px"}}>
					{inputFields.map((inputField, index) => (
						<Record inputField={inputField} index={index} key={index} inputFields={inputFields} setInputFields={setInputFields} />
					))}
				</div>
				<Timer timeToUpdate="10" onReset={resetTimer}>
					{({reset}) => (
						<>
						{!running && <Button variant="contained" color="primary" size="large" style={{padding: "2em 0"}} type="button" onClick={reset}>Start</Button>}
						{running && <Button type="button" variant="contained" size="large" color="secondary" style={{padding: "2em 0"}} onClick={reset}>Stop</Button>}
						<div style={{textAlign:"center",fontSize:"300%"}}>
							<Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />:<Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />
						</div>
						</>
					)}
				</Timer>
				<Button type="submit">Save</Button>
			</form>
		</div>
	)
}
