const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse; 
const bodyParser = require('body-parser');
const scribble = require('scribbletune');
//https://github.com/walmik/scribbletune
const app = express(); 
var textarr = []
app.use(bodyParser());
app.post('/cdc', (req, res) => {
  const twiml = new MessagingResponse();
  var msg = req.body.Body.toLowerCase()
  console.log(msg)
  noteMap = 
  {'amaj': 'A4 major', 'bmaj': 'B4 major', 'cmaj': 'C4 major','dmaj': 'D4 major', 'emaj': 'E4 major', 'fmaj': 'F4 major',
  'gmaj': 'G4 major','amin': 'A4 minor', 'bmin': 'B4 minor', 'cmin': 'C4 minor', 'dmin': 'D4 minor', 'emin': 'E4 minor',
  'fmin': 'F4 minor', 'gmin': 'G4 minor', 'aflamenco': 'A4 flamenco', 'bflamenco': 'B4 flamenco', 'cflamenco': 'C4 flamenco',
  'dflamenco': 'D4 flamenco', 'eflamenco': 'E4 flamenco','fflamenco': 'F4 flamenco', 'gflamenco': 'G4 flamenco', 
  'adim': 'A4 diminished', 'bdim': 'B4 diminished', 'cdim': 'C4 diminished','ddim': 'D4 diminished',
  'edim': 'E4 diminished', 'fdim': 'F4 diminished', 'gdim': 'G4 diminished', 'aenigmatic': 'A4 enigmatic',
  'benigmatic': 'B4 enigmatic', 'cenigmatic': 'C4 enigmatic', 'denigmatic': 'D4 enigmatic', 'eenigmatic': 'E4 enigmatic',
  'fenigmatic': 'F4 enigmatic', 'genigmatic': 'G4 enigmatic', 'aegyptian': 'A4 egyptian', 'begyption': 'B4 egyptian', 
  'cegyptian': 'C4 egyptian','degyptian': 'D4 egyptian', 'eegyptian': 'E4 egyptian', 'fegyptian': 'F4 egyptian', 
  'gegyptian': 'G4 egyptian', 'achromatic': 'A4 chromatic', 'bchromatic': 'B4 chromatic', 'cchromatic': 'C4 chromatic',
  'dchromatic': 'D4 chromatic', 'echromatic': 'E4 chromatic', 'fchromatic': 'F4 chromatic', 'gchromatic': 'G4 chromatic',
  'abebop': 'A4 bebop', 'bbebop': 'B4 bebop', 'cbebop': 'C4 bebop','dbebop': 'D4 bebop', 'ebebop': 'E4 bebop', 
  'fbebop': 'F4 bebop', 'gbebop': 'G4 bebop', 'apersian': 'A4 persian', 'bpersian': 'B4 persian', 'cpersian': 'C4 persian',
  'dpersian': 'D4 persian', 'epersian': 'E4 persian', 'fpersian': 'F4 persian', 'gpersian': 'G4 persian', 'aoriental': 'A4 oriental',
  'boriental': 'B4 oriental', 'coriental': 'C4 oriental','doriental': 'D4 oriental', 'eoriental': 'E4 oriental', 'foriental': 'F4 oriental',
  'goriental': 'G4 oriental'}
  if(msg in noteMap) {
    val = noteMap[msg]
    ret = "You sent a " + (val)
    console.log("msg ", msg, "ret ", ret)
  	twiml.message(ret)
  	textarr.push(val);
  }
  else {
    twiml.message('Try a note A-G followed by a chord: Amin = A minor, Bmaj = B major, Cdim = C diminished. Other chords: bebop, persian, oriental, egyptian, flamenco, chromatic, enigmatic');
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  console.log(textarr)
  let cdcSong = scribble.clip({
    notes: textarr,
    pattern: 'x-x_'.repeat(textarr.length),
  });
  scribble.midi(cdcSong, 'cdcsong.mid');
});

//extra bass
// bass = scribble.clip({
//   notes: scribble.scale('a', 'minor', 2).slice(0, 3),
//   pattern: '--x-'.repeat(4),
//   //'x_x_x_--'.repeat(8),
//   shuffle: true
// });
// scribble.midi(bass, 'bass.mid');

http.createServer(app).listen(4040, () => {
  console.log('Express server listening on port 4040');
});