const scribble = require('scribbletune')

console.log(scribble.chords())
var chord = scribble.clip({
	notes: ['c# +add#9'],
	pattern: 'x-x_'.repeat(2),
});


scribble.midi(chord, 'chord.mid')
