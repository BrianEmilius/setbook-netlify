import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@material-ui/core"
import { EditOutlined, ExpandMore, HistoryOutlined, Send } from "@material-ui/icons"
import { navigate } from "@reach/router"
import axios from "axios"
import { useContext, useState } from "react"
import TokenContext from "../contexts/TokenContext"
import SetTable from "./SetTable"
import "./AccordionElement.scss"

export default function AccordionElement({exercise}) {
	var [content, setContent] = useState({})
	var [token] = useContext(TokenContext)

	function toggle(expanded) {
		if (!expanded) return

		axios.get(`/.netlify/functions/get-previous-set?exercise=${exercise._id}`, {
			headers: {
				authorization: token
			}
		})
			.then(res => setContent(res.data))
	}

	return (
		<Accordion key={exercise._id} onChange={(e,expanded) => toggle(expanded)} className="accordion" >
			<AccordionSummary
				expandIcon={<ExpandMore style={{color: "white"}} />}
			>
				<Typography variant="body1" className="accordion__heading">{exercise.title}</Typography>
			</AccordionSummary>
			<AccordionDetails style={{ display: "grid", gridColumn: "1", gridRow: "repeat(2, auto)", gap: "1em" }}>
				{content ? <SetTable date={content.date} sets={content.sets} /> : <Typography variant="body2">You have not done this exercise before</Typography>}
				<div style={{display: "flex", justifyContent: "space-between"}}>
					<Button className="accordion__button"><HistoryOutlined /></Button>
					<Button className="accordion__button" onClick={() => navigate(`/exercise/${exercise._id}`)}><EditOutlined /></Button>
					<Button className="accordion__button--textured" variant="contained" endIcon={<Send />} onClick={() => navigate(`/runset/${exercise._id}`)}>
						Do it!
					</Button>
				</div>
			</AccordionDetails>
		</Accordion>
	)
}