'use strict';

/**
 * ISO 6346 letter mapping (A=10, B=12, ... skipping multiples of 11).
 * Check digit uses weights 2^pos for pos 0..9, then mod 11; remainder 10 => check digit 0.
 */
const LETTER_VALUE = Object.freeze({
  A: 10, B: 12, C: 13, D: 14, E: 15, F: 16, G: 17, H: 18, I: 19,
  J: 20, K: 21, L: 23, M: 24, N: 25, O: 26, P: 27, Q: 28, R: 29,
  S: 30, T: 31, U: 32, V: 34, W: 35, X: 36, Y: 37, Z: 38
});

const WEIGHTS_10 = Object.freeze(Array.from({ length: 10 }, (_, i) => 2 ** i));



export {
    LETTER_VALUE,
    WEIGHTS_10
};