var connect = require("../mongodb")
var validToken = require("../validateToken")
var parseToken = require("../parseToken")
const { ObjectId } = require("mongodb")

async function editExercise(db, userId, id, body) {
	var result = await db.collection("exercises").updateOne(
		{_id: ObjectId(id), user: ObjectId(userId)},
		{
			$set: { title: body.title }
		}
	)

	return {
		statusCode: 204,
		body: ""
	}
}

module.exports.handler = async function(event, context) {
	context.callbackWaitsForEmptyEventLoop = false

	// Check HTTP Method
	if (event.httpMethod !== "PATCH") return {
		statusCode: 405,
		body: "METHOD NOT ALLOWED",
		headers: {
			"Allow": "PATCH"
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
	var id = event.queryStringParameters.id
	var body = JSON.parse(event.body)

	return editExercise(db, userId, id, body)
}