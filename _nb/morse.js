---
description: |
  Convert to and from morse code. Requires input string '_text_'. Morse code to word conversions must start with periods, dashes, or underscores. Spaces in morse should use &#95; or &#124;.
variables:
  - text
tag: functions
order: 6
---
/* global text:true */
/* eslint-disable no-unused-expressions, no-prototype-builtins */

if (text === '') {
  text = 'we\'re going to need something to translate...';
} else if (text === 'help') {
  text = 'use plain text or \'.\', \'-\', and \'_\' (for spaces) as a query!';
} else {
  if (['.', '-', '_'].includes(text[0])) {
    // probably a morse to word
    // handle when underscores aren't space seperated
    text.replace(/_/g, ' _ ');
    text.replace(/\s+/g, ' ');
    const toWord = {
      '.-': 'A',
      '-...': 'B',
      '-.-.': 'C',
      '-..': 'D',
      '.': 'E',
      '..-.': 'F',
      '--.': 'G',
      '....': 'H',
      '..': 'I',
      '.---': 'J',
      '-.-': 'K',
      '.-..': 'L',
      '--': 'M',
      '-.': 'N',
      '---': 'O',
      '.--.': 'P',
      '--.-': 'Q',
      '.-.': 'R',
      '...': 'S',
      '-': 'T',
      '..-': 'U',
      '...-': 'V',
      '.--': 'W',
      '-..-': 'X',
      '-.--': 'Y',
      '--..': 'Z',
      '.----': '1',
      '..---': '2',
      '...--': '3',
      '....-': '4',
      '.....': '5',
      '-....': '6',
      '--...': '7',
      '---..': '8',
      '----.': '9',
      '-----': '0',
      _: ' ',
      '|': ' '
    };
    text = text.split(' ');
    for (let i = 0; i < text.length; i++) {
      if (toWord.hasOwnProperty(text[i])) {
        text[i] = toWord[text[i]];
      }
    }
    text = 'text: ' + text.join('');
  } else {
    // probably a word to morse
    text = text.toUpperCase();
    const toMorse = {
      A: '.-',
      B: '-...',
      C: '-.-.',
      D: '-..',
      E: '.',
      F: '..-.',
      G: '--.',
      H: '....',
      I: '..',
      J: '.---',
      K: '-.-',
      L: '.-..',
      M: '--',
      N: '-.',
      O: '---',
      P: '.--.',
      Q: '--.-',
      R: '.-.',
      S: '...',
      T: '-',
      U: '..-',
      V: '...-',
      W: '.--',
      X: '-..-',
      Y: '-.--',
      Z: '--..',
      1: '.----',
      2: '..---',
      3: '...--',
      4: '....-',
      5: '.....',
      6: '-....',
      7: '--...',
      8: '---..',
      9: '----.',
      0: '-----',
      ' ': '|'
    };
    text = text.split('');
    for (let i = 0; i < text.length; i++) {
      if (toMorse.hasOwnProperty(text[i])) {
        text[i] = toMorse[text[i]];
      }
    }
    text = 'morse: ' + text.join(' ');
    if (text.length > 500) {
      text = text.slice(0, 470);
      text += '[exceeds char limit]';
    }
  }
}
text;
