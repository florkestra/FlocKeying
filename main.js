window.onload = function() {
  document.querySelector('#greeting').innerText =
    'Hello, World! It is ' + new Date();
};

var synth = flock.synth({
  synthDef : {
    id : "synthy",
    ugen : "flock.ugen.sinOsc",
    freq : 200,
    mul: 0.25,
  }
});

synth.play();

$(document).on('keypress', function(e){
  console.log(e);
  $('#greeting').html(e.toString);
  synth.set("synthy.freq", e.which);
});