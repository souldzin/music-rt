const chai = require('chai');
const Mixer = require('./mixer');
const ToneStub = require('./tonejs-stub');
const Track = require('./track');

describe("mixer", function(){
    let tracks;
    let mixer;
    let Tone;

    beforeEach(function(){
        tracks = [1, 1, 1];
        mixer = new Mixer(tracks);
        Tone = new ToneStub();
    });

    describe(".start", function(){
        it("calls Tone.Transport.scheduleRepeat for each track", function(){
            mixer.start(Tone);

            chai.expect(Tone.Transport.scheduleRepeat.callCount).to.eq(mixer.tracks().size);
        });
    });

    describe(".size", function(){
        it("returns the number of tracks", function(){
            const result = mixer.size();

            chai.expect(result).to.eq(tracks.length);
        });
    });

    describe(".addTrack", function(){
        it("is immutable", function(){
            const size = mixer.size(); 
            const newMixer = mixer.addTrack(new Track());
            
            chai.expect(mixer.size()).to.eq(tracks.length);
        });
        it("concatenates a track", function(){
            const size = mixer.size();
        });
    });
});