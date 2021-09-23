import { Button, Typography, Container } from "@material-ui/core"
import { useState, useEffect, useContext } from "react"
import Record from "../components/Record"
import Timer from "react-compound-timer"
import axios from "axios"
import AppBar from "../components/AppBar"
import TokenContext from "../contexts/TokenContext"
import SetTable from "../components/SetTable"
import "./RunSet.scss"

export default function Home({ exercise }) {
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

	useEffect(function () {
		if ("wakeLock" in navigator) {
			navigator.wakeLock.request("screen")
				.then(() => console.log("wakelock active"))
				.catch(error => console.error(error))
		}
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
		<>
			<AppBar back="/home" />
			<Container className="viewContainer">
				<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1em" }}>
					<Typography className="heading" variant="h5" component="h1">{exerciseObject.title}</Typography>
					{prevSet.sets ?
						<SetTable date={prevSet.date} sets={prevSet.sets} />
						: <Typography>You have not done this exercise before</Typography>}
					<div style={{ display: "flex", overflowX: "scroll", margin: "1em 0", minHeight: "96px" }}>
						{inputFields.map((inputField, index) => (
							<Record inputField={inputField} index={index} key={index} inputFields={inputFields} setInputFields={setInputFields} />
						))}
					</div>
					<Timer timeToUpdate="10" onReset={resetTimer}>
						{({ reset }) => (
							<>
								{!running && <Button variant="contained" className="masterButton masterButton--start" size="large" type="button" onClick={reset}>Start</Button>}
								{running && <Button type="button" className="masterButton masterButton--end" variant="contained" size="large" onClick={reset}>Stop</Button>}
								<div className="timer">
									<Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />:<Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />
								</div>
							</>
						)}
					</Timer>
					<Button type="submit">Save</Button>
				</form>
			</Container>
		</>
	)
}
