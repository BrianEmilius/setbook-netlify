var validToken = require("../validateToken")
var connect = require("../mongodb")
var parseToken = require("../parseToken")
const { ObjectId } = require("mongodb")

async function saveSet(db, body) {
	var result = await db.collection("sets").insertOne({
		user: ObjectId(body.user),
		exercise: ObjectId(body.exercise),
		date: body.date,
		sets: body.sets
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

	var body = JSON.parse(event.body)
	var db = await connect()
	
	return saveSet(db, body)
}