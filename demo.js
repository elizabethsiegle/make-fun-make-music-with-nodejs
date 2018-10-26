const http = require('http');
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const bodyParser = require('body-parser');
const scribble = require('scribbletune');
const app = express(); 
var textarr = []
app.use(bodyParser());
app.post('/cdc', (req, res) => {
  noteArr = ['A4 major', 'B4 major', 'C4 major', 'D4 major', 'A4 minor', 'B4 minor', 'C4 minor', 'D4 minor', 'A4 diminished', 'C4 diminished',
  'B4 diminished', 'E4 diminished', 'G4 diminished', 'A4 bebop', 'G4 bebop', 'D4 oriental', 'A4 oriental', 'E4 oriental', 'G4 persian', 'E4 chromatic',
  'F2 bebop', 'B4 enigmatic', 'D4 flamenco', 'F4 flamenco', 'E4 chromatic', 'A4 egyptian']
  const twiml = new VoiceResponse();
  function gather() {
    const gatherNode = twiml.gather({ numDigits: 1 });
    gatherNode.say({voice: 'Polly.Joanna'}, 'Press a random number to submit a random chord');

    // If the user doesn't enter input, loop
    twiml.redirect('/cdc');
  }
  // If the user entered digits, process their request
  if (req.body.Digits) {
    var item = noteArr[Math.floor(Math.random()*noteArr.length)]
    const say = twiml.say({
      voice: 'Polly.Joanna'
    },
    'You selected ' + item
    );
    textarr.push(item);
    console.log(textarr);
  } else {
    // If no input was sent, use the <Gather> verb to collect user input
    gather();
  }

  // Render the response as XML in reply to the webhook request
  res.type('text/xml');
  res.send(twiml.toString());
  let cdcSong = scribble.clip({
    notes: textarr,
    pattern: 'x-x_'.repeat(textarr.length),
  });
  scribble.midi(cdcSong, 'cdcsong.mid');
});

http.createServer(app).listen(4040, () => {
  console.log('Express server listening on port 4040');
});