# emitter

[![npm|@streetstrider/emitter](http://img.shields.io/badge/npm-@streetstrider/emitter-CB3837.svg?style=flat-square)](https://www.npmjs.org/package/@streetstrider/emitter)

> Emitter, MultiEmitter & Slot

This is a simple, easy, and robust implementation of the fundamental JS pattern called «Event Emitter». It is intended to be well-designed, free of misconceptions, and minimalistic. This library splits the pattern into **Emitter**, **MultiEmitter**, and **Slot**. Emitter can emit single kind of events. MultiEmitter can emit several kinds of events. Slot can emit single kind of events and guarantee to have no more than one subscription at a time.

## [Features](#features) • [API](#api) • [Examples](#examples) • [Types](#types) • [Design](#some-design-solutions) • [License](#license)

## Features
* Single-channel emitter — no event name, just a list of subscriptions.
* Multi-channel emitter (like EventEmitter or nanoevents).
* Slot — single-channel emitter with single subscription.
* Minimal overhead.
* Composable API, clean separation of concerns.
* Fast, optimized emit.
* Minimal memory footprint, proper garbage collection.
* Provides disposer.
* Fully tested & 100% coverage.
* Precise TypeScript definitions; typedefs are well-tested.
* The code is ES6 CJS with correct typedefs, work in any environment.
* Emitter is 578 characters when minified (Multi is 971, Slot is 349).

## API

You can consult `.d.ts` files for the exact API. Below is preudocode. Emitter and Slot have the same API.

```ts
type Disposer = () => void
type Subscription <Args extends unknown[]> = (...args: Args) => void

type Emitter<Args extends unknown[]> =
{
  on (fn: Subscription<Args>): Disposer,
  emit (...args: Args): void,
  is_empty (): boolean,
}
```

```ts
type Disposer = () => void
type Subscription <Args extends unknown[]> = (...args: Args) => void
type HandlersBase =
{
  [key: string]: unknown[],
}

type MultiEmitter <Handlers extends HandlersBase> =
{
  on <Key extends keyof Handlers> (key: Key, fn: Subscription<Handlers[Key]>): Disposer,
  emit <Key extends keyof Handlers> (key: Key, ...args: Handlers[Key]): void,
  is_empty (): boolean,
}
```

## Examples
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
import Slot from '@streetstrider/emitter/slot'

const slot = Slot()

const disposer = slot.on((a, b) => console.log(a + b))
```

```js
import MultiEmitter from '@streetstrider/emitter/multi'
import { multi as once_multi } from '@streetstrider/emitter/once'

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
const e1 = Emitter<[number, number]>()
e1.emit(1, 2)

const e2 = MultiEmitter<{ plus: [number, number] }>()
e2.emit('plus', 1, 2)
```

## Some design solutions

### Why Disposer instead of removeListener?
Disposer is a simple `() => void` function that can be easily passed around, used as a one-off for event from another emitter, and composed with other disposers via ordinary `compose`. You can pass it without wrapping it with an arrow function since disposer is a simple void function. It is much easier and cleaner than storing references to the original function and emitter. The disposer is exactly the same for Emitter, MultiEmitter, and Slot. Disposer make some efforts to disrupt references to prevent memory leaks and open a way for earlier garbage collection.

### Why split Emitter and MultiEmitter?
Most of the approaches (like EventEmitter or nanoevents) convege to the top most powerful multi-channel emitter since it covers all the cases. However, in many situations, Emitter is just enough. It is much simpler and easier to have one or two separate Emitter instances with clean semantics rather than have some string-keyed channels inside MultiEmitter. It is not smart to use MultiEmitter if you have only one type of event.

### Why split Emitter and Slot?

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
ISC, © Strider, 2024.
