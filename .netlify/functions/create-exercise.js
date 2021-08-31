var validToken = require("../validateToken")
var connect = require("../mongodb")
var parseToken = require("../parseToken")
const { ObjectId } = require("mongodb")

async function createExercise(db, user, exercise) {
	var result = await db.collection("exercises").insertOne({
		user: ObjectId(user),
		title: exercise
	})

	return {
		statusCode: 201,
		body: JSON.stringify(result[0])
	}
}

module.exports.handler = async function(event, context) {
	context.callbackWaitsForEmptyEventLoop = false

	// Check HTTP Method
	if (event.httpMethod !== "POST") return {
		statusCode: 405,
		body: "METHOD NOT ALLOWED",
		headers: {
			"Allow": "POST"
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

	var exercise = JSON.parse(event.body).exercise
	var userId = parseToken(event.headers.authorization).data.id
	var db = await connect()
	
	return createExercise(db, userId, exercise)
}