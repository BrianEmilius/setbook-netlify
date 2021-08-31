import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import ArrowBack from "@material-ui/icons/ArrowBack"
import { navigate } from "@reach/router"

export default function ApplicationBar({back}) {
	return (
		<AppBar position="fixed">
			<Toolbar style={{display:"grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
				{back && <IconButton edge="start" color="inherit" onClick={() => navigate(back)} style={{justifySelf: "start"}}>
					<ArrowBack />
				</IconButton>}
				<IconButton edge="end" color="inherit" aria-label="menu" style={{gridColumnStart: "2", justifySelf: "end"}}>
					<MenuIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}
