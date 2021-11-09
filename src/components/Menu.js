import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import { navigate } from "@reach/router"
import "./Menu.scss"

export default function Menu({ open, setOpen }) {
	return (
		<Drawer open={open} anchor="right" onClose={() => setOpen(!open)}>
			<List className="menu" onClick={() => setOpen(!open)} style={{ width: 340 }}>
				<ListItem button onClick={() => navigate("/home")}>
					<ListItemIcon><HomeIcon /></ListItemIcon>
					<ListItemText>Home</ListItemText>
				</ListItem>
			</List>
		</Drawer>
	)
}
