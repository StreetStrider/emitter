
module.exports = function Emitter ()
{
	var fns = null

	function on (fn)
	{
		if (fns)
		{
			fns.push(fn)
		}
		else
		{
			fns = [ fn ]
		}

		return disposer(fn)
	}

	function disposer (fn)
	{
		return () =>
		{
			if (! fn) { return }

			if (fns.length > 1)
			{
				var index = fns.indexOf(fn)
				fns = fns.filter((_, fn_index) => (fn_index !== index))
			}
			else if (fns[0] === fn)
			{
				fns = null
			}

			fn = null
		}
	}

	function emit (...args)
	{
		if (! fns) { return }

		for (var fn of fns)
		{
			fn(...args)
		}
	}

	return { on, emit }
}
