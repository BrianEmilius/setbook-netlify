import { Container, FormControlLabel, Switch } from "@material-ui/core"
import { useEffect, useState } from "react"
import ApplicationBar from "../components/AppBar"


export default function Settings() {
	var [checked, setChecked] = useState(false)
	var [wakeLock, setWakeLock] = useState({})

	
	useEffect(function() {
		(async function() {
			try {
				if (checked && !wakeLock.released)
					setWakeLock(await navigator.wakeLock.request("screen"))
				else 
					wakeLock.release()
			} catch (error) {
				console.error(error.name, error.message)
			}
		}())
	}, [checked, wakeLock])

	function WakeLock() {
		if (!("wakeLock" in navigator)) return
	
		return (
			<FormControlLabel
					control={
						<Switch
							checked={checked}
							onChange={() => setChecked(!checked)}
							color="primary"
						/>
					}
					label="Keep Screen On"
				/>
		)
	}

	return (
		<>
			<ApplicationBar back="/home" />
			<Container>
				<WakeLock />
			</Container>
		</>
	)
}