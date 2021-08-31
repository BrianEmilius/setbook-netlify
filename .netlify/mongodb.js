const MONGO_URI = process.env.MONGO_URI

var MongoClient = require("mongodb").MongoClient

var cachedDb = null

async function connectToDatabase() {
	if (cachedDb) return cachedDb

	var client = await MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
	cachedDb = client.db("SetBook")
	return cachedDb
}

module.exports = connectToDatabase
