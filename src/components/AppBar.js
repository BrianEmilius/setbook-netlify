import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ArrowBack from "@material-ui/icons/ArrowBack"
import { navigate } from "@reach/router"
import Menu from "./Menu"
import { useState } from "react"

export default function ApplicationBar({back}) {
	var [open, setOpen] = useState(false)
	return (
		<AppBar position="fixed">
			<Toolbar style={{display:"grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
				{back && <IconButton edge="start" color="inherit" onClick={() => navigate(back)} style={{justifySelf: "start"}}>
					<ArrowBack />
				</IconButton>}
				<IconButton onClick={() => setOpen(!open)} edge="end" color="inherit" aria-label="menu" style={{gridColumnStart: "2", justifySelf: "end"}}>
					<MenuIcon />
				</IconButton>
			</Toolbar>
			<Menu open={open} setOpen={setOpen} />
		</AppBar>
	)
}
