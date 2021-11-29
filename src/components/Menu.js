import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import XX from "@material-ui/icons/OutdoorGrill"
import { navigate } from "@reach/router"
import "./Menu.scss"
import { useContext } from "react" 
import TokenContext from "../contexts/TokenContext"

export default function Menu({ open, setOpen }) {
	var [token, setToken] = useContext(TokenContext)
	function logout() {
		document.cookie = "sb-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
		setToken(null)
		navigate("/home")
	}

	return (
		<Drawer open={open} anchor="right" onClose={() => setOpen(!open)}>
			<List className="menu" onClick={() => setOpen(!open)} style={{ width: 340 }}>
				<ListItem button onClick={() => navigate("/home")}>
					<ListItemIcon className="menu__text"><HomeIcon /></ListItemIcon>
					<ListItemText>Home</ListItemText>
				</ListItem>
				<ListItem button onClick={() => logout()}>
					<ListItemIcon className="menu__text"><XX /></ListItemIcon>
					<ListItemText>Log out</ListItemText>
				</ListItem>
			</List>
		</Drawer>
	)
}
