
import { Emitter } from '../'
import { Disposer } from '../'

import E from '../'
import once from '../once'

var e = E<[string, number]>()

e // $ExpectType Emitter<[string, number]>

e.on((s: string, n: number) => console.log(s.repeat(n)))
e.on((s, n) => console.log(s.repeat(n)))
e.on((s, n) =>
{
	s // $ExpectType string
	n // $ExpectType number
})

once(e, (s: string, n: number) => console.log(s.repeat(n)))
once(e, (s, n) => console.log(s.repeat(n)))
once(e, (s, n) =>
{
	s // $ExpectType string
	n // $ExpectType number
})

// $ExpectError
e.on((a: number, b: number) => console.log(a + b))
// $ExpectError
e.on(true)
// $ExpectError
e.on()

// $ExpectError
once((a: number, b: number) => console.log(a + b))
// $ExpectError
once(null, (a: number, b: number) => console.log(a + b))
// $ExpectError
once(e)
// $ExpectError
once(true)
// $ExpectError
once()

e.emit('a', 5)

// $ExpectError
e.emit(1, 5)
// $ExpectError
e.emit(1)
// $ExpectError
e.emit()

// $ExpectType Disposer
var ds = e.on(() => {})

ds()
ds()

if (e.is_empty())
{
	console.log('empty')
}

// $ExpectError
console.log(e.is_empty() + 1)


import { MultiEmitter } from '../multi'
import M from '../multi'
import { multi as once_multi } from '../once'

var m = M<{ a: [string, number], b: [boolean] }>()

m // $ExpectType MultiEmitter<{ a: [string, number]; b: [boolean]; }>

m.on('a', (s, n) =>
{
	s // $ExpectType string
	n // $ExpectType number
})

m.on('b', (b) =>
{
	b // $ExpectType boolean
})

once_multi(m, 'a', (s, n) =>
{
	s // $ExpectType string
	n // $ExpectType number
})
once_multi(m, 'b', (b) =>
{
	b // $ExpectType boolean
})

// $ExpectError
m.on('b', (n: number) => {})

// $ExpectError
m.on('a')

// $ExpectError
m.on('a', true)

// $ExpectError
m.on(true, true)

// $ExpectError
m.on('c', () => {})

// $ExpectError
once_multi((s: string, n: number) => {})
// $ExpectError
once_multi(null, (s: string, n: number) => {})
// $ExpectError
once_multi(m)
// $ExpectError
once_multi(true)
// $ExpectError
once_multi()


/* cross-once: */
// $ExpectError
once(m, (a: number, b: number) => console.log(a + b))
// $ExpectError
multi_once(e, 'b', (b) => {})
