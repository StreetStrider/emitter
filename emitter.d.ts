
type ArgsBase = any[]

export type Subscription<Args extends ArgsBase> = (...args: Args) => void

export type Disposer = () => void

export type Emitter<Args extends ArgsBase> =
{
	on(fn: Subscription<Args>): Disposer,
	emit(...args: Args): void,
}

export default function<Args extends ArgsBase> (): Emitter<Args>
