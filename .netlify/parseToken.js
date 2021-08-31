module.exports = function parseToken(token) {
	return JSON.parse(String(token).split("~")[1])
}