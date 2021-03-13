
import { Emitter } from '../'
import { Disposer } from '../'

import E from '../'

var e = E<[string, number]>()

e // $ExpectType Emitter<[string, number]>

e.on((s: string, n: number) => console.log(s.repeat(n)))
e.on((s, n) => console.log(s.repeat(n)))
e.on((s, n) =>
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
