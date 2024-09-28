
module.exports = function Emitter ()
{
	var L = 0

	var fn1 = null
	var fns = null

	function on (fn)
	{
		if (L > 1)
		{
			fns = [].concat(fns, fn)

			L++
		}
		else if (L === 1)
		{
			fns = [ fn1, fn ]
			fn1 = null

			L = 2
		}
		else
		{
			fn1 = fn

			L = 1
		}

		return disposer(fn)
	}

	/* eslint-disable complexity */
	function disposer (fn)
	{
		return () =>
		{
			if (! fn) { return }

			if (L > 1)
			{
				var index = fns.indexOf(fn)
				if (index !== -1)
				{
					fns = fns.filter((_, fn_index) => (fn_index !== index))

					if (L === 2)
					{
						fn1 = fns[0]
						fns = null
					}

					L--
				}
			}
			else if (L === 1)
			{
				if (fn1 === fn)
				{
					fn1 = null

					L = 0
				}
			}

			fn = null
		}
	}
	/* eslint-enable complexity */

	function emit (...args)
	{
		switch (L)
		{
		case 1:
			fn1(...args)
			return

		case 0:
			return

		default:
			var   L$ = L
			var fns$ = fns

			for (var i = 0; (i < L$); i++)
			{
				var fn = fns$[i]

				fn(...args)
			}
		}
	}

	function is_empty ()
	{
		return (! L)
	}

	return { on, emit, is_empty }
}
