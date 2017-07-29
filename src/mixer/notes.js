export const REGEX_NOTE_OCTAVE = "^([A-G][#b]?)([0-9])$";

export const NOTES_COUNT = 12;

export const NOTES = {
    "C": 0,
    "C#": 1,
    "Db": 1,
    "D": 2,
    "D#": 3,
    "Eb": 3,
    "E": 4,
    "F": 5,
    "F#": 6,
    "Gb": 6,
    "G": 7,
    "G#": 8,
    "Ab": 8,
    "A": 9,
    "A#": 10,
    "Bb": 10,
    "B": 11
};

export const NOTES_BY_INDEX = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
];

export function isValidNoteOctave(note) {
    const regex = new RegExp(REGEX_NOTE_OCTAVE);
    const result = regex.test(note);

    return result;
}

export function parseNoteOctave(note) {
    const regex = new RegExp(REGEX_NOTE_OCTAVE);    
    const result = regex.exec(note);

    if(!result) {
        return false;
    }

    return {
        note: result[1],
        octave: Number(result[2])
    };
}

export function getNoteIdx(note) {
    return note ? NOTES[note] : -1;
}

export function mapNoteOctaveToNumber(x) {
    const {note, octave} = parseNoteOctave(x);
    const noteIdx = getNoteIdx(note);

    return noteIdx + (octave * NOTES_COUNT);
}

export function mapNumberToNoteOctave(num) {
    const q = Math.floor(num / NOTES_COUNT);
    const idx = num % NOTES_COUNT;

    return NOTES_BY_INDEX[idx] + q;
}
