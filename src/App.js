import "./App.css"
import { Router } from "@reach/router"
import RunSet from "./views/RunSet"
import CreateUser from "./views/CreateUser"
import LogIn from "./views/LogIn"
import TokenContext from "./contexts/TokenContext"
import { useState } from "react"
import Home from "./views/Home"

export default function App() {
	var tokenState = useState(null)

	return (
		<div className="App">
			<TokenContext.Provider value={tokenState}>
					<Router>
						{(function () {
							if (tokenState[0] !== null) {
								return (<>
									<Home path="/home" />
									<RunSet path="/runset/:exercise" />
								</>)
							}
						})()}
						<LogIn default path="/login" />
						<CreateUser path="/create-user" />
					</Router>
			</TokenContext.Provider>
		</div>
	);
}
