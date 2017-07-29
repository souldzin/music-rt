import { List, Map } from "immutable";
import Tone from "tone";

export const oscillators = List("sine", "square", "triangle", "sawtooth");

export const synths = List([
    Map({
        id: "am",
        display: "AM Synth",
        create: () => new Tone.AMSynth().toMaster()
    }),
    Map({
        id: "fm",
        display: "FM Synth",
        create: () => new Tone.FMSynth().toMaster()
    }),
    Map({
        id: "membrane",
        display: "Membrane Synth",
        create: () => new Tone.MembraneSynth().toMaster()
    }),
    Map({
        id: "metal",
        display: "Metal Synth",
        create: () => new Tone.MetalSynth().toMaster(),
        isNoise: true
    }),
    Map({
        id: "mono",
        display: "Mono Synth",
        create: () => new Tone.MonoSynth().toMaster()
    }),
    Map({
        id: "noise",
        display: "Noise Synth",
        create: () => new Tone.NoiseSynth().toMaster(),
        isNoise: true
    }),
]);

export const synthsById = synths.groupBy(x => x.get("id")).map(v => v.first());

export function getSynth(id) {
    return synthsById.get(id);
}