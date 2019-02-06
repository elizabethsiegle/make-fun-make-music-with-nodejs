var scribble = require('scribbletune')

notearr = [
	'b4', 'e4', 'g4', 'f#4', 'e4', 'b4', 'a4', 'f#4',
	'e4', 'g4', 'f#4', 'd4', 'f4', 'b4', 'b4', 'e4', 'g4'
]
var song = scribble.clip({
	notes: notearr,
	pattern: 'x_'.repeat(notearr.length)
})

scribble.midi(song, 'song.mid');