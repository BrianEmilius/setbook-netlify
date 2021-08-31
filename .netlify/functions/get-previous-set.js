var connect = require("../mongodb")
var validToken = require("../validateToken")
var parseToken = require("../parseToken")
const { ObjectId } = require("mongodb")

async function getSets(db, user, exercise) {
	var result = await db.collection("sets").find({ user: ObjectId(user), exercise: ObjectId(exercise) }).sort({ date: -1 }).limit(1).toArray()

	return {
		statusCode: 200,
		body: JSON.stringify(result[0])
	}
}

module.exports.handler = async function(event, context) {
	context.callbackWaitsForEmptyEventLoop = false

	// Check HTTP Method
	if (event.httpMethod !== "GET") return {
		statusCode: 405,
		body: "METHOD NOT ALLOWED",
		headers: {
			"Allow": "GET"
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
	return getSets(db, userId, event.queryStringParameters.exercise)
}
