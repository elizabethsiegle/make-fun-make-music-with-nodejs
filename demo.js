const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse; 
const bodyParser = require('body-parser');
const scribble = require('scribbletune');
//https://github.com/walmik/scribbletune
const app = express(); 
var textarr = []
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.post('/iglive', (req, res) => {
  const twiml = new MessagingResponse();
  var msg = req.body.Body.toLowerCase().trim()
  console.log(msg);
  var noteMap = {
    "amaj": "A4 major",
    "bmaj": "B4 major",
    cmaj: "C4 major",
    dmaj: "D4 major",
    emaj: "E4 major",
    fmaj: "F4 major",
    gmaj: "G4 major",
    amin: "A4 minor",
    bmin: "B4 minor",
    cmin: "C4 minor",
    dmin: "D4 minor",
    emin: "E4 minor",
    fmin: "F4 minor",
    gmin: "G4 minor",
    aflamenco: "A4 flamenco",
    bflamenco: "B4 flamenco",
    cflamenco: "C4 flamenco",
    dflamenco: "D4 flamenco",
    eflamenco: "E4 flamenco",
    fflamenco: "F4 flamenco",
    gflamenco: "G4 flamenco",
    aegyptian: "A4 egyptian",
    begyptian: "B4 egyptian",
    cegyptian: "C4 egyptian",
    degyptian: "D4 egyptian",
    eegyptian: "E4 egyptian",
    fegyptian: "F4 egyptian",
    gegyptian: "G4 egyptian",
    abebop: "A4 bebop"
  };
  if (msg in noteMap) {
    twiml.message("You sent an " + noteMap[msg]);
    textarr.push(noteMap[msg])
  }
  else {
    twiml.message(
      "Try another chord A-G: Amin=A4 minor, Bmaj=B4 major, cflamenco=c4 flamenco, degyptian=d4 egyptian, ebebop=e4 bebop"
    );
  }
  
  // else if(msg == 'abebop') {
  //   twiml.message('You sent a A bebop');
  //   textarr.push('A4 bebop');
  // }
  // else if(msg == 'bbebop') {
  //   twiml.message('You sent a B bebop');
  //   textarr.push('B4 bebop');
  // }
  // else if(msg == 'cbebop') {
  //   twiml.message('You sent a C bebop');
  //   textarr.push('C4 bebop');
  // }
  // else if(msg == 'dbebop') {
  //   twiml.message('You sent a D bebop');
  //   textarr.push('D4 bebop');
  // }
  // else if(msg == 'ebebop') {
  //   twiml.message('You sent a E bebop');
  //   textarr.push('E4 bebop');
  // }
  // else if(msg == 'fbebop') {
  //   twiml.message('You sent a F bebop');
  //   textarr.push('F4 bebop');
  // }
  // else if(msg == 'gbebop') {
  //   twiml.message('You sent a G bebop');
  //   textarr.push('G4 bebop');
  // }

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  console.log(textarr)
  let audience = scribble.clip({
  notes: textarr,
  pattern: 'x_x_x_'.repeat(2),
  sizzle: true
});  

 // console.log(chords);
scribble.midi(audience, 'audience.mid');
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

// const http = require('http');
// const express = require('express');
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
// const bodyParser = require('body-parser');
// const scribble = require('scribbletune');
// const app = express(); 
// var textarr = []
// app.use(bodyParser());
// app.post('/cdc', (req, res) => {
//   noteArr = ['A4 major', 'B4 major', 'C4 major', 'D4 major', 'A4 minor', 'B4 minor', 'C4 minor', 'D4 minor', 'A4 diminished', 'C4 diminished',
//   'B4 diminished', 'E4 diminished', 'G4 diminished', 'A4 bebop', 'G4 bebop', 'D4 oriental', 'A4 oriental', 'E4 oriental', 'G4 persian', 'E4 chromatic',
//   'F2 bebop', 'B4 enigmatic', 'D4 flamenco', 'F4 flamenco', 'E4 chromatic', 'A4 egyptian']
//   const twiml = new VoiceResponse();
//   function gather() {
//     const gatherNode = twiml.gather({ numDigits: 1 });
//     gatherNode.say({voice: 'Polly.Joanna'}, 'Press a random number to submit a random chord');

//     // If user doesn't enter input, loop
//     twiml.redirect('/cdc');
//   }
//   // If user entered digits, process their request
//   if (req.body.Digits) {
//     var item = noteArr[Math.floor(Math.random()*noteArr.length)]
//     const say = twiml.say({
//       voice: 'Polly.Joanna'
//     },
//     'You selected ' + item
//     );
//     textarr.push(item);
//     console.log(textarr);
//   } else {
//     //no input sent, use <Gather> verb to get user input
//     gather();
//   }

//   // Render the response as XML in reply to the webhook request
//   res.type('text/xml');
//   res.send(twiml.toString());
//   let cdcSong = scribble.clip({
//     notes: textarr,
//     pattern: 'x-x_'.repeat(textarr.length),
//   });
//   scribble.midi(cdcSong, 'cdcsong.mid');
// });

// http.createServer(app).listen(4040, () => {
//   console.log('Express server listening on port 4040');
// });