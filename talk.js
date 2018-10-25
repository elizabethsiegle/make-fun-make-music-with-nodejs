const scribble = require('scribbletune')

//one note
var note = scribble.clip({
	notes: ['c4'],
	pattern: 'x-x_'.repeat(4)
});
scribble.midi(note, 'note.mid')

console.log(scribble.chords())

var chord = scribble.clip({
	notes:['C4 major'],
	pattern: 'x_'.repeat(7)
})
scribble.midi(chord, 'chord.mid')

var multNotes = scribble.clip({
	notes: ['c4', 'd4', 'e4', 'd4', 'c4', 'b4']
	.filter((a, x) => x % 2 == 0),
	pattern: 'x_'.repeat(6)
})
scribble.midi(multNotes, 'multNotes.mid')

var shuff = scribble.clip({
	notes: ['c4', 'd4', 'e4', 'd4', 'c4', 'b4'],
	pattern: 'x-x'.repeat(6),
	shuffle: true
});
scribble.midi(shuff, 'shuff.mid');

console.log(scribble.scales())
var scale = scribble.clip({
	notes: scribble.scale('c# augmented heptatonic'),
	pattern: 'x_'.repeat(7)
});

scribble.midi(scale, 'scale.mid');


var scale2 = scribble.clip({
	notes: scribble.scale('bb super locrian pentatonic'),
	pattern: 'x-'.repeat(7)
})
scribble.midi(scale.concat(scale2), 'scale2.mid')