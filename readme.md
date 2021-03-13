# emitter
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
* About 500 characters when minified.

## API / Example
```js
import Emitter from '@streetstrider/emitter'

const emitter = Emitter()

const disposer = emitter.on((a, b) => console.log(a + b))

emitter.emit(1, 2)

disposer()

emitter.is_empty() // → true
```

```js
import MultiEmitter from '@streetstrider/emitter/multi'

const emitter = MultiEmitter()

const ds1 = emitter.on('plus', (a, b) => console.log(a + b))
const ds2 = emitter.on('mul',  (a, b) => console.log(a * b))

emitter.emit('plus', 1, 2)
emitter.emit('mul', 3, 4)

ds1()
ds2()

emitter.is_empty() // → true
```

## Tests / Coverage
Fully tested with Mocha, 100% coverage.

## Types
Built-in TypeScript type definitions.
```typescript
const emitter = Emitter<[number, number]>()
const emitter = MultiEmitter<{ plus: [number, number] }>()
```

## Performance
This library is benchmarked in comparison to nanoevents. The main target for optimizations is `emitter.emit()`.
In case of:
* 1 sub — 35% faster than nanoevents.
* 2 subs — 20% faster.
* 10 subs — on par (~5% faster).
* 0 subs — 45% faster.
* Using multiple arguments slows emitter down, but it's still moderately faster (~5-15% faster) or on par with nanoevents.

## License
ISC, © Strider, 2021.
