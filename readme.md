# emitter
> Single channel event emitter

## Features
* Single channel (no event names), minimal overhead.
* Fast, optimized emit.
* Provides disposer.
* Minimal memory footprint, proper garbage collection.
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

## Tests / Coverage
Fully tested with Mocha, 100% coverage.

## Types
Built-in TypeScript type definitions.

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
