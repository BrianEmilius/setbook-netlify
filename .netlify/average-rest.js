function reducer(prevValue, currentValue) {
	return (currentValue.end - currentValue.start) + prevValue
}

function getAverageRest(sets) {
	var rests = sets.length - 1
	var activeTime = sets.reduce(reducer, 0)
	var totalTime = sets[rests].end - sets[0].start
	var rest = new Date(Math.floor((totalTime - activeTime) / rests))
	var minutes = rest.getMinutes()
	var seconds = rest.getSeconds()
	seconds = seconds < 10 ? "0" + seconds : seconds
	return !isNaN(minutes) ? `${minutes}:${seconds}` : "No rest"
}

module.exports = getAverageRest
