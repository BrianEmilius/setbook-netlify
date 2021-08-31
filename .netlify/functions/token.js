var bcrypt = require("bcrypt")
var connect = require("../mongodb")
var Token = require("signed-jwt")
var secret = process.env.TOKEN_SECRET

async function getUser(db, email, password) {
	var result = await db.collection("users").find({ email }).toArray()

	if (result.length === 0) {
		return {
			statusCode: 400,
			body: "BAD REQUEST"
		}
	}

	try {
		var isValid = await bcrypt.compare(password, result[0].password)

		if (!isValid) {
			return {
				statusCode: 403,
				body: "FORBIDDEN"
			}
		}

		return {
			statusCode: 201,
			body: Token({ id: result[0]._id }, secret)
		}
	} catch (error) {
		console.log(error)
		return {
			statusCode: 403,
			body: "FORBIDDEN"
		}		
	}
}

module.exports.handler = async function(event, context) {
	context.callbackWaitsForEmptyEventLoop = false

	// Check HTTP Method
	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			body: "METHOD NOT ALLOWED",
			headers: {
				"Allow": "POST"
			}
		}
	}

	var db = await connect()
	var body = JSON.parse(event.body)

	return getUser(db, body.email, body.password)
}