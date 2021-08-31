var connect = require("../mongodb")
var bcrypt = require("bcrypt")

async function getUser(db, user) {
	var result = await db.collection("users").find({ email: user }).toArray()
	return result.length === 0 ? false : true
}

async function createUser(db, email, password) {
	var result = await db.collection("users").insertOne({
		email, password
	})

	return {
		statusCode: 201,
		body: JSON.stringify(result.ops[0])
	}
}

module.exports.handler = async function (event, context) {
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

	// Check if a user alredy exists with this email
	if (await getUser(db, body.email)) {
		return {
			statusCode: 400,
			body: "BAD REQUEST"
		}
	}

	var saltRounds = 10;

	try {
		var salt = await bcrypt.genSalt(saltRounds)
		var hash = await bcrypt.hash(body.password, salt)

		return createUser(db, body.email, hash)
	} catch (error) {
		console.log(error)
		return {
			statusCode: 500,
			body: "INTERNAL SERVER ERROR"
		}
	}
}