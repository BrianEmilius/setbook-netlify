import "./App.scss"
import { Routes, Route, useNavigate } from "react-router-dom"
import TokenContext from "./contexts/TokenContext"
import { useEffect, useState } from "react"
import getCookie from "./helpers/get-cookie"
import RunSet from "./views/RunSet"
import CreateUser from "./views/CreateUser"
import LogIn from "./views/LogIn"
import Home from "./views/Home"
import Settings from "./views/Settings"
import Exercise from "./views/Exercise"
import History from "./views/History"

export default function App() {
	var tokenState = useState(null)
	var navigate = useNavigate()

	useEffect(function () {
		var cookie = getCookie("sb-token")
		if (cookie === "") return

		var setToken = tokenState[1];
		setToken(cookie)
		navigate("/")
	}, [tokenState])

	return (
		<div className="App">
			<TokenContext.Provider value={tokenState}>
				<Routes>
					{ tokenState[0] ? (
						<>
							<Route element={<Home/>} path="/" />
							<Route element={<RunSet/>} path="/runset/:exercise" />
							<Route element={<Exercise/>} path="/exercise/:id" />
							<Route element={<Settings/>} path="/settings" />
							<Route element={<History/>} path="/history/:exerciseId" />
						</>
					) : (
						<>
							<Route element={<LogIn/>} path="/" />
							<Route element={<CreateUser/>} path="/create-user" />
						</>
					) }
				</Routes>
			</TokenContext.Provider>
		</div>
	)
}
