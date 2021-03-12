
module.exports = function Emitter ()
{
	var fns = null

	function on (fn)
	{
		if (! fns)
		{
			fns = fn
		}
		else if (typeof fns === 'function')
		{
			fns = [ fns, fn ]
		}
		else
		{
			fns.push(fn)
		}

		return disposer(fn)
	}

	function disposer (fn)
	{
		return () =>
		{
			if (! fn) { return }

			if (fns === fn)
			{
				fns = null
			}
			else
			{
				var index = fns.indexOf(fn)
				fns = fns.filter((_, fn_index) => (fn_index !== index))

				if (fns.length === 1)
				{
					fns = fns[0]
				}
			}

			fn = null
		}
	}

	function emit (...args)
	{
		if (typeof fns === 'function')
		{
			fns(...args)
		}
		else if (fns)
		{
			var fnss = fns
			var i = 0
			var L = fnss.length

			for (; (i < L); i++)
			{
				var fn = fnss[i]

				fn(...args)
			}
		}
	}

	function is_empty ()
	{
		return (! fns)
	}

	return { on, emit, is_empty }
}
