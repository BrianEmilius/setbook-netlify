import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ArrowBack from "@material-ui/icons/ArrowBack"
import { navigate } from "@reach/router"
import Menu from "./Menu"
import { useState } from "react"
import "./AppBar.scss"

export default function ApplicationBar({back}) {
	var [open, setOpen] = useState(false)
	return (
		<AppBar position="fixed" className="appbar">
			<Toolbar style={{display:"grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
				{back && <IconButton edge="start" onClick={() => navigate(back)} style={{justifySelf: "start"}}>
					<ArrowBack className="appbar__iconButton" />
				</IconButton>}
				<IconButton onClick={() => setOpen(!open)} edge="end" aria-label="menu" style={{gridColumnStart: "2", justifySelf: "end"}}>
					<MenuIcon className="appbar__iconButton" />
				</IconButton>
			</Toolbar>
			<Menu open={open} setOpen={setOpen} />
		</AppBar>
	)
}
