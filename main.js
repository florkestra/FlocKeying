window.onload = function() {
  document.querySelector('#greeting').innerText =
    'Hello, World! It is ' + new Date();
};

var synth = flock.synth.polyphonic({
  synthDef : {
    id : "synthy",
    ugen : "flock.ugen.sinOsc",
    freq : 200,
        mul: {
            id: "env",
            ugen: "flock.ugen.env.simpleASR",
            attack: 0.1,
            sustain: 1.0,
            release: 2.0
        }
   }
});

// http://stackoverflow.com/questions/7686197/how-can-i-avoid-autorepeated-keydown-events-in-javascript
var keyAllowed = {}; // store keys down to avoid autorepeat

$(document).on('keydown', function(e){
  if (keyAllowed [e.which] === false) return;
  keyAllowed [e.which] = false;
  $('#greeting').html( fluid.prettyPrintJSON(keyAllowed) );

  synth["noteOn"]("key"+e.which.toString(), {"synthy.freq":e.which*4});
});


$(document).on('keyup', function(e){
  keyAllowed [e.which] = true;
    $('#greeting').html( fluid.prettyPrintJSON(keyAllowed) );

  synth["noteOff"]("key"+e.which.toString(), {"synthy.freq":e.which*4} );
});

synth.play();
