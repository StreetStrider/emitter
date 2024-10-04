/* eslint-disable no-debugger */

var Slot = require('../slot')
var Emitter = require('../')
var MultiEmitter = require('../multi')



//
var s = Slot()

var total = 0

for (let n = 0; n < 50000; n++)
{
	let ds = s.on((x) => { total = (total + x + n) })
	s.emit(1)
	ds()
}

debugger


//
var e1 = Emitter()
var e2 = Emitter()

var total = 0

for (let n = 0; n < 5000; n++)
{
	let dss = []

	for (let n = 0; n < 50; n++)
	{
		dss.push(e1.on((x) => { total = (total + x + n) }))
		dss.push(e2.on((x) => { total = (total + x + n) }))
	}

	e1.emit(1)
	e2.emit(1)

	dss.forEach(ds => ds())
}

debugger


//
var e1 = MultiEmitter()
var e2 = MultiEmitter()

var total = 0

for (let n = 0; n < 5000; n++)
{
	let dss = []

	for (let n = 0; n < 50; n++)
	{
		dss.push(e1.on('a', (x) => { total = (total + x + n) }))
		dss.push(e2.on('a', (x) => { total = (total + x + n) }))
		dss.push(e1.on('b', (x) => { total = (total + x + n) }))
		dss.push(e2.on('b', (x) => { total = (total + x + n) }))
	}

	e1.emit('a', 1)
	e2.emit('a', 1)
	e1.emit('b', 1)
	e2.emit('b', 1)

	dss.forEach(ds => ds())
}

debugger
