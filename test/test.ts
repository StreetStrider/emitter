
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
