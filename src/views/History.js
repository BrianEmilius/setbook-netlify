import { Container, Typography, Button, Card, CardContent } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { navigate } from "@reach/router"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import ApplicationBar from "../components/AppBar"
import TokenContext from "../contexts/TokenContext"
import Spinner from "../components/Spinner"
import SetTable from "../components/SetTable"
import "./History.scss"

export default function History({ exerciseId }) {
	var [content, setContent] = useState({})
	var [token] = useContext(TokenContext)
	var [isLoading, setIsLoading] = useState(true)

	useEffect(function () {
		axios.get(`/.netlify/functions/get-history?id=${exerciseId}`, {
			headers: {
				Authorization: token
			}
		})
			.then(response => {
				setContent(response.data)
				setIsLoading(false)
			})
	}, [token, exerciseId])

	return (
		<>
			<ApplicationBar back={-1} />
			{isLoading ? <Spinner /> : <Container className="viewContainer">
				<Typography variant="h5" component="h1" className="text history-heading">
					{content.title}
					<Button className="accordion__button--textured" variant="contained" endIcon={<Send />} onClick={() => navigate(`/runset/${exerciseId}`)}>
						Do it!
					</Button>
				</Typography>
				{content.results?.map(element => (
					<Card key={element._id} className="card">
						<CardContent>
							<SetTable date={element.date} sets={element.sets} />
							<Typography className="text" style={{ marginBottom: "1em" }}>Average rest time: {element.averageRest}</Typography>
						</CardContent>
					</Card>
				))}
			</Container>}
		</>
	)
}
