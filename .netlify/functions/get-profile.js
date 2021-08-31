var validToken = require("../validateToken")
var parseToken = require("../parseToken")
var connect = require("../mongodb")
var { ObjectId } = require("mongodb")

async function getUserExercises(db, user) {
	return db.collection("exercises").find({user: ObjectId(user)}).toArray()
}

module.exports.handler = async function(event, context) {
	context.callbackWaitsForEmptyEventLoop = false

	// Check HTTP Method
	if (event.httpMethod !== 'GET') {
		return {
			statusCode: 405,
			body: "METHOD NOT ALLOWED",
			headers: {
				"Allow": "GET"
			}
		}
	}

	// check for required auth header
	if(!event.headers.authorization) return {
		statusCode: 401,
		body: "UNAUTHORIZED"
	}

	// check if auth token is valid
	if(!validToken(event.headers.authorization)) return {
		statusCode: 403,
		body: "FORBIDDEN"
	}

	var db = await connect()
	var userId = parseToken(event.headers.authorization).data.id

	return {
		statusCode: 200,
		body: JSON.stringify({
			user: userId,
			exercises: getUserExercises(db, userId)})
	}
}
