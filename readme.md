# emitter

[![npm|@streetstrider/emitter](http://img.shields.io/badge/npm-@streetstrider/emitter-CB3837.svg?style=flat-square)](https://www.npmjs.org/package/@streetstrider/emitter)

> single- and multi-channel event emitter

## Features
* Single-channel emitter — no event name, just a list of subscriptions.
* Multi-channel emitter (like EventEmitter or nanoevents).
* Minimal overhead.
* Fast, optimized emit.
* Minimal memory footprint, proper garbage collection.
* Provides disposer.
* Fully tested & 100% coverage.
* TypeScript defs.
* TypeScript defs are fully tested.
* utility: once.
* utility: when.
* Emitter is 557 characters when minified (952 for Multi).

## API / Example
```js
import Emitter from '@streetstrider/emitter'
import once from '@streetstrider/emitter/once'

const emitter = Emitter()

const disposer = emitter.on((a, b) => console.log(a + b))
const disposer = once(emitter, (a, b) => console.log(a + b))

emitter.emit(1, 2)

disposer()

emitter.is_empty() // → true
```

```js
import MultiEmitter from '@streetstrider/emitter/multi'
import { multi as once_multi } from '../once'

const emitter = MultiEmitter()

const ds1 = emitter.on('plus', (a, b) => console.log(a + b))
const ds2 = emitter.on('mul',  (a, b) => console.log(a * b))

const ds3 = once_multi(emitter, 'plus', (a, b) => console.log(a + b))
const ds4 = once_multi(emitter, 'mul',  (a, b) => console.log(a * b))

emitter.emit('plus', 1, 2)
emitter.emit('mul', 3, 4)

ds1()
ds2()

emitter.is_empty() // → true
```

```js
import Emitter from '@streetstrider/emitter'
import when from '@streetstrider/emitter/when'

const emitter = Emitter()

async function do_async () {
  const next_one = await when(emitter) /* would capture first emission */
}

emitter.emit('next_one')
emitter.emit('next_two')
emitter.emit('next_three')

```

## Types
Built-in TypeScript type definitions.
```typescript
const emitter = Emitter<[number, number]>()
const emitter = MultiEmitter<{ plus: [number, number] }>()
```

## Some design solutions
### Why are `once` and `when` not in the core?
Because they are not part of the minimal API. Making them public methods on emitter would also make them non-tree-shakeable and the only gain would be consistent syntax with `on` (via dot). If you still want this, you can patch your emitters by binding/partialing (bring your own) `once` and/or `when`. You can also attach them by currying them.

```js
import once from '@streetstrider/emitter/once'

const emitter = Emitter()

emitter.once = once.bind(null, emitter)
emitter.once = partial(once, emitter)

const disposer = emitter.once((a, b) => console.log(a + b))
```

```js
import { multi as once_multi } from '@streetstrider/emitter/once'

const emitter = MultiEmitter()

emitter.once = once_multi.bind(null, emitter)
emitter.once = partial(once_multi, emitter)

const disposer = emitter.once('plus', (a, b) => console.log(a + b))
```

## License
ISC, © Strider, 2022.
