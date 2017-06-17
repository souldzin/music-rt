var Tone = require('tone');

/// get elements

var elements = {
    start: document.getElementById("start"),
    stop: document.getElementById("stop"),
    loopTime: document.getElementById("loopTime"),
    mLoopTime: document.getElementById("mLoopTime")
};

/// Tone state

var synth1 = new Tone.FMSynth().toMaster();
var synth1sequence = [
    "F4", // 1
    "A4", 
    "B4", // 2
    "F4", 
    "A4", // 3
    "B4", 
    null, // 4
    null, 
    "F4", // 1
    "A4",
    "B4", // 2
    "F4",
    "A4", // 3
    "B4", 
    null, // 4
    null,
    "F4", // 1
    "A4",
    "B4", // 2
    "E5",
    "D5", // 3
    null,
    null, // 4
    "B4",
    "C5", // 1
    "B4",
    "G4", // 2
    "D4",
    null, // 3
    null,
    null, // 4
    null,
];
var synth1player = buildSequencePlayer(0, synth1, synth1sequence);

var synth2 = new Tone.NoiseSynth().toMaster();

Tone.Transport.scheduleRepeat(function(time){
    showLoopTime(time);    
    synth1player(time);
}, "8n");

Tone.Transport.scheduleRepeat(function(time){
    showMeasureTime(time);
}, "1m");

Tone.Transport.scheduleRepeat(function(time){
    synth2.triggerAttackRelease("4n", time);
}, "1m")

/// Tone functions

function buildSequencePlayer(currentIdx, synth, sequence) {
    return function(time) {
        if(currentIdx < sequence.length) {
            var item = sequence[currentIdx];
            if(item) {
                synth.triggerAttackRelease(item, "8n", time);
            }
        } else if((currentIdx + 1) % 8 === 0) {
            currentIdx = -1;
        }
        currentIdx += 1;
    }
}

function stop() {
    console.log("Stopping Tone.Transport")
    Tone.Transport.stop();
}

function start() {
    console.log("Starting Tone.Transport...")
    Tone.Transport.start();
}

/// Display functions

function showLoopTime(time) {
    console.log("Loop tick: " + time);
    elements.loopTime.textContent = time.toFixed(2);
}

function showMeasureTime(time) {
    console.log("Measure tick: " + time);
    elements.mLoopTime.textContent = time.toFixed(2);
}

/// add event listeners
elements.start.addEventListener("click", start);
elements.stop.addEventListener("click", stop);