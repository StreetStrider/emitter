
module.exports = function once (emitter, fn)
{
	var ds = emitter.on((...args) =>
	{
		ds()
		fn(...args)
	})

	return ds
}

module.exports.multi = function once_multi (multi, key, fn)
{
	var ds = multi.on(key, (...args) =>
	{
		ds()
		fn(...args)
	})

	return ds
}
