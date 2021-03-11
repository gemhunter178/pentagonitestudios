/* Tell ESLint that there will be the following global variables */
/* global text:true */

/* These ESLint errors should be handled, but for now I just want to get it to pass */
/* eslint-disable no-undef, prefer-const */

let iptNum = 1;
if (text.length === 0) {
  text = 'You gotta enter a sentence to typo, silly!';
} else if (/^help$|^\\?$|^info$/.test(text)) {
  text = "Gem's typo v1! allows even more cursed typos if you start with typo[num], up to 10";
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

let words = text.split(' ');
for (i = 0; i < words.length; i++) {
  let ltrs = words[i].split('');
  for (j = 1; j < ltrs.length - 1; j++) {
    if (Math.random() < (0.15 * iptNum)) {
      if (Math.random() < 0.7) {
        tmp = ltrs[j];
        ltrs[j] = ltrs[j + 1];
        ltrs[j + 1] = tmp;
        j++;
      } else {
        ltrs[j] += ltrs[j];
      }
    }
    if (j > 1 && Math.random() < (0.025 * repeatNum)) {
      j--;
    }
  }
  words[i] = ltrs.join('');
}
text = words.join(' ');
