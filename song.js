var scribble = require('scribbletune')

notearr = [
	'eb4', 'eb4', 'eb4', 'eb4', 'f4', 'd4', 'c4', 'bb3', 'g3', 'eb4', 'eb4', 'eb4', 'eb4', 'f4', 'd4', 'c4', 'bb3',
	'g3', 'eb4', 'eb4', 'eb4', 'f4', 'd4', 'c4', 'eb4', 'eb4', 'eb4', 'eb4', 'eb4', 'f4', 'eb4', 'f4', 'eb4', 'f4', 'eb4', 
	'eb4', 'f4', 'f4', 'g4', 'eb4', 'eb4', 'eb4', 'g4', 'eb4', 'eb4', 'f4', 'f4', 'eb4', 'f4', 'eb4', 'eb4', 'f4', 'f4', 'g4',
	'eb4', 'eb4', 'eb4', 'eb4', 'eb4', 'd4', 'eb4', 'f4', 'eb4', 'eb4', 'eb4', 'eb4', 'eb4', 'eb4', 'eb4'
]
var song = scribble.clip({
	notes: notearr,
	pattern: 'x-'.repeat(notearr.length)
})

scribble.midi(song, 'song.mid');