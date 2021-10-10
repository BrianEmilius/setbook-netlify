var connect = require("../mongodb")
var validToken = require("../validateToken")
var parseToken = require("../parseToken")
var { ObjectId } = require("mongodb")
var getAverageRest = require("../average-rest")

async function getExercises(db, user, id) {
	var result = await db.collection("sets").find({
		user: ObjectId(user),
		exercise: ObjectId(id)
	}).sort({
		date: -1
	}).toArray()

	result = result.map(element => {
		element.averageRest = getAverageRest(element.sets)
		return element
	})

	return {
		statusCode: 200,
		body: JSON.stringify(result)
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
	var id = event.queryStringParameters.id
	return getExercises(db, userId, id)
}
