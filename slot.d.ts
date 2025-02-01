
import type { ArgsBase } from './emitter.js'
import type { Disposer }  from './emitter.js'


declare namespace Slot
{

export type Subscription <Args extends ArgsBase, Return = unknown> = (...args: Args) => Return

export type Slot <Args extends ArgsBase, Return = unknown> =
{
	on (fn: Subscription<Args, Return>): Disposer,
	emit (...args: Args): Return,
	/* emit_or (fallback_fn: (...args: Args) => Return, ...args: Args): Return, */
	emit_must (...args: Args): Return,
	is_empty (): boolean,
}

}

declare function Slot <Args extends ArgsBase, Return = unknown> (): Slot.Slot<Args, Return>

export = Slot
