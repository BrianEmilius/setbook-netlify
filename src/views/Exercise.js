import "./Exercise.scss"
import ApplicationBar from "../components/AppBar"
import { useContext, useEffect, useState } from "react"
import TokenContext from "../contexts/TokenContext"
import axios from "axios"
import { Button, Container, Snackbar } from "@material-ui/core"
import Spinner from "../components/Spinner"

export default function Exercise({ id }) {
	var [content, setContent] = useState({})
	var [token] = useContext(TokenContext)
	var [isLoading, setIsLoading] = useState(true)
	var [open, setOpen] = useState(false)
	var [snackbarMessage, setSnackbarMessage] = useState("")

	function updateField(e) {
		var temporaryContent = { ...content }
		temporaryContent[e.target.name] = e.target.value
		setContent(temporaryContent)
	}

	function handleClose(e) {
		setOpen(false)
	}

	function handleSubmit(e) {
		e.preventDefault()
		axios.patch(`/.netlify/functions/edit-exercise?id=${id}`,
			JSON.stringify({title: content.title}),
			{
				headers: {
					authorization: token
				}
			}
		)
			.then(res => {
				if (res.status === 204) {
					setSnackbarMessage("Exercise updated")
				} else {
					setSnackbarMessage("Something went wrong")
				}
				setOpen(true)
			})
	}

	useEffect(function () {
		axios.get(`/.netlify/functions/get-exercise?id=${id}`, {
			headers: {
				authorization: token
			}
		})
			.then(res => {
				setContent(res.data)
				setIsLoading(false)
			})
	}, [id, token])
	return (
		<>
			<ApplicationBar back="/home" />
			<Container className="viewContainer">
				{isLoading ? <Spinner /> :
					<form onSubmit={handleSubmit}>
						<label className="inputGroup">
							Title
							<input type="text" name="title" value={content.title} onChange={updateField} />
						</label>
						<Button variant="contained" type="submit">Save</Button>
					</form>
				}
			</Container>
			<Snackbar open={open} message={snackbarMessage} autoHideDuration={5000} onClose={handleClose} />
		</>
	)
}
