var validToken = require("../validateToken")
var connect = require("../mongodb")
const { ObjectId } = require("mongodb")

async function updateSet(db, id, body) {
	var result = await db.collection("sets").updateOne(
		{_id: ObjectId(id)},{
			$set: {
				sets: body.sets
			}
		})

	return {
		statusCode: 204,
		body: JSON.stringify(result[0])
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

	var body = JSON.parse(event.body)
	var db = await connect()
	var id = event.queryStringParameters.id
	
	return updateSet(db, id, body)
}