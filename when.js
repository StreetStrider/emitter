
var once = require('./once')
var once_multi = require('./once').multi

module.exports = function when (emitter)
{
	return new Promise(rs => once(emitter, rs))
}

module.exports.multi = function when_multi (emitter, key)
{
	return new Promise(rs => once_multi(emitter, key, rs))
}
