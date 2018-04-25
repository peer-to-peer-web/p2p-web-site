var Tone

var loaded = false
var synthOne = { }
var synthTwo = { }

var notes = [
  'C2', 'E2', 'F2', 'G2',
  'C3', 'F3', 'G3',
  'C4', 'E4', 'F4', 'G4',
]

function init () {
  Tone = require('tone/build/Tone.min.js')
  var chOne = new Tone.PanVol(-0.8, -3).connect(Tone.Master)
  var chTwo = new Tone.PanVol(0.8, -3).connect(Tone.Master)

  synthOne = new Tone.Sampler({
    'C3' : '/content/berlin/2018-02-10/sample.mp3'
  }).connect(chOne)

  synthTwo = new Tone.Sampler({
    'C3' : '/content/berlin/2018-02-10/sample.mp3'
  }).connect(chTwo)

  loaded = true
}

module.exports = {
  load: function () {
    if (!loaded) init()
  },
  playOne: function () {
    var note = getNote()
    if (synthOne.loaded) synthOne.triggerAttack(note)
    return note
  },
  playTwo: function () {
    var note = getNote()
    if (synthTwo.loaded) synthTwo.triggerAttack(note)
    return note
  }
}

function getNote () {
  var note = Math.floor(Math.random() * (notes.length - 1)) 
  return notes[note]
}