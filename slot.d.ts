
import type { ArgsBase } from './emitter.js'
import type { Emitter }  from './emitter.js'


declare namespace Slot
{

export type Slot <Args extends ArgsBase> = Emitter<Args>
	&
{
	/* emit_or (fallback_fn: (...args: Args) => void, ...args: Args): void, */
	emit_must (...args: Args): void,
}

}

declare function Slot <Args extends ArgsBase> (): Emitter<Args>

export = Slot
