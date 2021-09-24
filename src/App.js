import "./App.scss"
import { navigate, Router } from "@reach/router"
import RunSet from "./views/RunSet"
import CreateUser from "./views/CreateUser"
import LogIn from "./views/LogIn"
import TokenContext from "./contexts/TokenContext"
import { useEffect, useState } from "react"
import Home from "./views/Home"
import getCookie from "./helpers/get-cookie"
import Settings from "./views/Settings"
import Exercise from "./views/Exercise"

export default function App() {
	var tokenState = useState(null)

	useEffect(function() {
		var cookie = getCookie("sb-token")
		if (cookie === "") return

		var setToken = tokenState[1];
		setToken(cookie)
		navigate("/home")
	}, [tokenState])

	return (
		<div className="App">
			<TokenContext.Provider value={tokenState}>
				<Router>
					{(function () {
						if (tokenState[0] !== null) {
							return (<>
								<Home path="/home" />
								<RunSet path="/runset/:exercise" />
								<Exercise path="/exercise/:id" />
								<Settings path="/settings" />
							</>)
						}
					})()}
					<LogIn default path="/login" />
					<CreateUser path="/create-user" />
				</Router>
			</TokenContext.Provider>
		</div>
	)
}
