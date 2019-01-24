const scribble = require('scribbletune');

var note = scribble.clip({
	notes: ['c4']
});
scribble.midi(note, 'note.mid');

var notes = scribble.clip({
	notes: ['c1', 'd1', 'e1', 'f1', 'g1', 'a1', 'b1'],
	pattern: 'x-x_'.repeat(4)
});
scribble.midi(notes, 'notes.mid');

var scale = scribble.clip({
	notes: scribble.scale('a4 Major'),
	pattern: 'x-'.repeat(7)
});
scribble.midi(scale, 'scale.mid');

console.log(scribble.scales());
var scale2 = scribble.clip({
	notes: scribble.scale('a4 Major').filter((x, y) => y%2 == 1),
	pattern: 'x-'.repeat(7)
});
scribble.midi(scale2, 'scale2.mid');

console.log(scribble.chords());
var chord = scribble.clip({
	notes: ['C# m11'],
	pattern: 'x_'.repeat(4)
})

var arp = scribble.clip({
	notes: scribble.arp('CM EM GM'),
	pattern: 'x_'.repeat(4),
	subdiv: '16n' //optional
});

scribble.midi(arp, 'arp.mid');
