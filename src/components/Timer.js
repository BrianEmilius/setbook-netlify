import { useEffect } from "react"
import { useState } from "react"

export default function Timer({running}) {
	var [time, setTime] = useState(Date.now())

	useEffect(function() {
		setTime(Date.now())
	}, [running])

	useEffect(function() {
		setInterval(function() {
			setTime(Date.now() - time) // 15975633 - 15975633 = 0
		}, 10)
	}, [])

	return (
		<div style={{display:"flex",justifyContent:"center",fontSize:"300%"}}>
			{("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}:{("0" + (Math.floor(time / 10) % 100)).slice(-2)}
		</div>
	)
}
