# emitter
```js
import Emitter from '@streetstrider/emitter'

const emitter = Emitter()

const ds = emitter.on((a, b) => console.log(a + b))

emitter.emit(1, 2)

ds()
```
