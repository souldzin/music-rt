export function range(len) {
    return Array(len).fill().map((_, i) => i);
}

export function repeat(len, val) {
    return Array(len).fill(val);
}