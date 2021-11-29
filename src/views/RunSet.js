import { Button, Typography, Container, Snackbar } from "@material-ui/core"
import { SaveAlt } from "@material-ui/icons"
import { useState, useEffect, useContext } from "react"
import Record from "../components/Record"
import Timer from "react-compound-timer"
import axios from "axios"
import AppBar from "../components/AppBar"
import TokenContext from "../contexts/TokenContext"
import SetTable from "../components/SetTable"
import Spinner from "../components/Spinner"
import "./RunSet.scss"

export default function Home({ exercise }) {
	var [token] = useContext(TokenContext)
	var [inputFields, setInputFields] = useState([])
	var [running, setRunning] = useState(false)
	var [exerciseObject, setExercise] = useState([])
	var [prevSet, setPrevSet] = useState({})
	var [started, setStarted] = useState(false)
	var [isLoading, setIsLoading] = useState(true)
	var [open, setOpen] = useState(false)
	var [snackbarMessage, setSnackbarMessage] = useState("")
	var [isSaved, setIsSaved] = useState(false)
	var [setId, setSetId] = useState(null)
	var [disabled, setDisabled] = useState(false)
	var [wakeLock, setWakeLock] = useState(null)

	function saveSet(data) {
		axios.post("/.netlify/functions/save-set", JSON.stringify(data), {
			headers: {
				authorization: token
			}
		})
			.then(response => {
				if (response.status === 201) {
					setSnackbarMessage("Sets saved")
					setSetId(response.data.insertedId)
					setOpen(true)
					setIsSaved(true)
				} else {
					setSnackbarMessage("Something went wrong")
					setOpen(true)
				}
			})
			.catch(error => {
				console.error(error)
				setSnackbarMessage("Something went wrong")
				setOpen(true)
			})
	}

	function updateSet(data) {
		axios.patch(`/.netlify/functions/update-set?id=${setId}`, JSON.stringify(data), {
			headers: {
				authorization: token
			}
		})
			.then(response => {
				if (response.status === 204) {
					setSnackbarMessage("Sets updated")
					setOpen(true)
				} else {
					setSnackbarMessage("Something went wrong")
					setOpen(true)
				}
			})
			.catch(error => {
				console.error(error)
				setSnackbarMessage("Something went wrong")
				setOpen(true)
			})
	}

	function handleSubmit(e) {
		e.preventDefault()

		var data = {
			user: JSON.parse(token.split("~")[1]).data.id,
			date: Date.now(),
			exercise: exerciseObject._id,
			sets: inputFields
		}

		isSaved ? updateSet(data) : saveSet(data)
	}

	function handleClose() {
		setOpen(false)
	}

	function addSet() {
		var values = [...inputFields, { start: Date.now(), end: 0, reps: 0, weight: 0 }]
		setInputFields(values)
		setRunning(true)
		setStarted(true)
	}

	function removeSet(index) {
		if (running) return

		var values = [...inputFields]
		values.splice(index, 1)
		setInputFields(values)
	}

	function stopSet() {
		setRunning(false)
		var values = [...inputFields]
		values[values.length - 1].end = Date.now()
		setInputFields(values)
	}

	function resetTimer() {
		setDisabled(true)

		setTimeout(function () {
			setDisabled(false)
		}, 3000)

		if (!running) {
			addSet()
			return
		}

		stopSet()
		return
	}

	async function requestWakeLock() {
		try {
			var temp = await navigator.wakeLock.request("screen")
			setWakeLock(() => temp)
			console.log("wakeLock active")
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(function () {
		if ("wakeLock" in navigator) {
			requestWakeLock()
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
			.then(res => {
				setPrevSet(res.data)
				setIsLoading(false)
			})
	}, [exercise, token])

	useEffect(function() {
		return () => {
			if (wakeLock !== null) {
				wakeLock.release()
					.then(() => {
						console.log("wakeLock inactive")
					})
			}
		}
	}, [wakeLock])

	return (
		<>
			<AppBar back={-1} />
			<Container className="viewContainer">
				{isLoading ? <Spinner /> : <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1em" }}>
					<Typography className="text" variant="h5" component="h1">{exerciseObject.title}</Typography>

					{prevSet.sets ?
						<SetTable date={prevSet.date} sets={prevSet.sets} />
						: <Typography className="text">You have not done this exercise before</Typography>}

					<div style={{ display: "flex", overflowX: "scroll", margin: "1em 0", minHeight: "162px" }}>
						{inputFields.map((inputField, index) => (
							<Record
								key={index}
								inputField={inputField}
								index={index}
								inputFields={inputFields}
								setInputFields={setInputFields}
								removeSet={removeSet}
							/>
						))}
					</div>

					<Timer timeToUpdate="10" onReset={resetTimer}>
						{({ reset }) => (
							<>
								<Button
									variant="contained"
									size="large"
									type="button"
									onClick={reset}
									className={"masterButton masterButton--" + (running ? "end" : "start") + (disabled ? " disabled" : "")}>
									{running ? "Stop" : "Start"}
								</Button>
								<div className={"timer" + (!running ? " timer--running" : "")}>
									{!started ? null : <><Timer.Minutes formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />:<Timer.Seconds formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} /></>}
								</div>
							</>
						)}
					</Timer>
					<Button type="submit" variant="contained" endIcon={<SaveAlt />}>Save</Button>
				</form>}
			</Container>
			<Snackbar open={open} message={snackbarMessage} autoHideDuration={5000} onClose={handleClose} />
		</>
	)
}
