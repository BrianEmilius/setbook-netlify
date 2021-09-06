import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import ProfileIcon from "@material-ui/icons/Person"
import SettingsIcon from "@material-ui/icons/Settings"
import HomeIcon from "@material-ui/icons/Home"
import { navigate } from "@reach/router"

export default function Menu({ open, setOpen }) {
	return (
		<Drawer open={open} anchor="right" onClose={() => setOpen(!open)}>
			<List onClick={() => setOpen(!open)} style={{width: 240}}>
			<ListItem button onClick={() => navigate("/home")}>
					<ListItemIcon><HomeIcon /></ListItemIcon>
					<ListItemText>Home</ListItemText>
				</ListItem>
				<ListItem button onClick={() => navigate("/profile")}>
					<ListItemIcon><ProfileIcon /></ListItemIcon>
					<ListItemText>Profile</ListItemText>
				</ListItem>
				<ListItem button onClick={() => navigate("/settings")}>
					<ListItemIcon><SettingsIcon /></ListItemIcon>
					<ListItemText>Settings</ListItemText>
				</ListItem>
			</List>
		</Drawer>
	)
}
