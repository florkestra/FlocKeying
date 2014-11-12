flock.init();

fluid.registerNamespace("flork");

flork.keyer = function () {
    var that = {
        // http://stackoverflow.com/questions/7686197/how-can-i-avoid-autorepeated-keydown-events-in-javascript
        keyAllowed: {},

        // This is sad because a user who
        // wants to reuse a flork.keyer with their
        // own custom instrument can't.
        // Sine wave or the highway.
        synth: flock.synth.polyphonic({
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
       })
    };

    that.noteOn = function (keyCode) {
        if (that.keyAllowed[keyCode] === false) {
            return;
        }

        that.keyAllowed[keyCode] = false;
        that.printKeyState();
        that.synth.noteOn(keyCode, {
            "synthy.freq": keyCode * 4
        });
    };

    that.noteOff = function (keyCode) {
        that.keyAllowed[keyCode] = true;
        that.printKeyState();
        that.synth.noteOff(keyCode);
    };

    that.printKeyState = function () {
        var keyState = fluid.prettyPrintJSON(that.keyAllowed);
        that.printGreeting(keyState);
    };

    that.printGreeting = function (text) {
        $("#greeting").html(text);
    };

    that.init = function () {
        var doc = $(document);

        doc.keydown(function (e) {
            that.noteOn(e.which);
        });

        doc.keyup(function (e) {
            that.noteOff(e.which);
        });

        that.printGreeting("Hello, World! It is " + new Date());
        flock.enviro.shared.play();
   };

   that.init();
   return that;
};

// Instantiate a keyer immediately upon page load and make it global.
// Note that this sucks for people who want to reuse your code but
// not necessarily instantiate a keyer as soon as your script loads.
// This should be moved to a separate script file
// (since Chrome stupidly forbids inline script blocks).
$(function () {
    window.keyer = flork.keyer();
});
