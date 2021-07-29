---
description: same as the typo_1.js but with an improved function of also making typos with letters commonly mistyped on a QWERTY keyboard.
variables:
  - text
  - words
  - iptNum
  - repeatNum
tag: functions
order: 3
---

/* Tell ESLint that there will be the following global variables */
/* global text:true */

/* These ESLint errors should be handled, but for now I just want to get it to pass */
/* eslint-disable prefer-const */

let iptNum = 1;
if (text.length === 0) {
  text = 'You gotta enter a sentence to typo, silly!';
} else if (/^help$|^\\?$|^info$/.test(text)) {
  text = "Gem's typo v2! more jumbled typos if you start with typo[num], up to 10";
  iptNum = 0;
} else {
  const rgex = /typo(\d+)[\s,]/;
  const fndwrd = text.match(rgex);
  const pos = text.search(rgex);
  if (fndwrd !== null) {
    let last = fndwrd[0].substr(-1);
    if (last !== ',') {
      last = '';
    }
    iptNum = fndwrd[1];
    text = text.substr(0, pos) + last + text.substr(pos + fndwrd[0].length);
  }
}

let repeatNum = 0;
if (iptNum > 10 || iptNum < 0) {
  repeatNum = 4;
} else if (iptNum > 6) {
  repeatNum = iptNum - 6;
}

//loosely based on https://datagenetics.com/blog/november42012/index.html
const adjChars = {
  a: ['s', 's', 'w', 'x'],
  b: ['f', 'g', 'n', 'h'],
  c: ['d', 'f', 's', 's'],
  d: ['e', 'r', 's', 's'],
  e: ['r', 'r', 's', 's'],
  f: ['t', 'r', 'f', 'b'],
  g: ['t', 'f', 'n', 'h'],
  h: ['g', 'm', 'n', 'u'],
  i: ['o', 'o', 'u', 'l'],
  j: ['h', 'm', 'n', 'k'],
  k: ['l', 'i', 'm', 'o'],
  l: ['i', 'o', 'p', 'k'],
  m: ['h', 'j', 'k', 'n'],
  n: ['m', 'b', 'g', 'h'],
  o: ['i', 'i', 'l', 'p'],
  p: ['l', 'l', 'o', 'o'],
  q: ['s', 's', 'a', 'w'],
  r: ['e', 'd', 'g', 't'],
  s: ['d', 'e', 'c', 'a'],
  t: ['f', 'g', 'h', 'r'],
  u: ['i', 'i', 'y', 'h'],
  v: ['b', 'c', 'd', 'f'],
  w: ['a', 'd', 'e', 's'],
  x: ['a', 'c', 'd', 's'],
  y: ['g', 'g', 'h', 'h'],
  z: ['s', 's', 'a', 'x'],
  ',': ['m', '.', '.', '<'],
  '.': [',', ',', '/', '>']
};

let words = text.split(' ');
for (let i = 0; i < words.length; i++) {
  let ltrs = words[i].split('');
  for (let j = 1; j < ltrs.length - 1; j++) {
    if (Math.random() < (0.15 * iptNum)) {
      if (Math.random() < 0.65) {
        let tmp = ltrs[j];
        ltrs[j] = ltrs[j + 1];
        ltrs[j + 1] = tmp;
        j++;
      } else if (Math.random() < 0.5) {
        ltrs[j] += ltrs[j];
      } else {
        if (adjChars.hasOwnProperty(ltrs[j])) {
          ltrs[j] = adjChars[ltrs[j]][Math.floor(Math.random() * 4)];
        }
      }
    }
    if (j > 1 && Math.random() < (0.025 * repeatNum)) {
      j--;
    }
  }
  words[i] = ltrs.join('');
}
text = words.join(' ');
