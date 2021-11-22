import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import { useNavigate } from "react-router-dom"
import "./Menu.scss"

export default function Menu({ open, setOpen }) {
	var navigate = useNavigate()
	return (
		<Drawer open={open} anchor="right" onClose={() => setOpen(!open)}>
			<List className="menu" onClick={() => setOpen(!open)} style={{ width: 340 }}>
				<ListItem button onClick={() => navigate("/")}>
					<ListItemIcon><HomeIcon /></ListItemIcon>
					<ListItemText>Home</ListItemText>
				</ListItem>
			</List>
		</Drawer>
	)
}
