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
            attack: 0.25,
            sustain: 1.0,
            release: 0.5
        }
   }
});



$(document).on('keydown', function(e){
  //console.log(e);
  $('#greeting').html(e.which.toString());
  synth["noteOn"]("key"+e.which.toString(), {"synthy.freq":e.which*4});
});


$(document).on('keyup', function(e){
  synth["noteOff"]("key"+e.which.toString() );
});

synth.play();