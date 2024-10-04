
import type { ArgsBase } from './emitter.js'
import type { Emitter }  from './emitter.js'


declare namespace Slot
{

export type { Emitter as Slot }

}

declare function Slot <Args extends ArgsBase> (): Emitter<Args>

export = Slot
