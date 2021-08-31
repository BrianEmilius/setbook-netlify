var Token = require("signed-jwt")
var TOKEN_SECRET = process.env.TOKEN_SECRET

module.exports = function(token) {
	return Token.validate(token, TOKEN_SECRET)
}