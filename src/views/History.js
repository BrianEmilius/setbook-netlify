import { Container, Typography } from "@material-ui/core"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ApplicationBar from "../components/AppBar"
import TokenContext from "../contexts/TokenContext"
import Spinner from "../components/Spinner"
import SetTable from "../components/SetTable"

export default function History() {
	var [content, setContent] = useState([])
	var [token] = useContext(TokenContext)
	var [isLoading, setIsLoading] = useState(true)
	var { exerciseId } = useParams()

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
			<ApplicationBar back="/" />
			{isLoading ? <Spinner /> : <Container className="viewContainer">
				<Typography variant="h5" component="h1" className="text">
					History
					{content.map(element => (
						<div key={element._id}>
							<SetTable date={element.date} sets={element.sets} />
							<Typography className="text" style={{marginBottom: "1em"}}>Average rest time: {element.averageRest}</Typography>
						</div>
					))}
				</Typography>
			</Container>}
		</>
	)
}
