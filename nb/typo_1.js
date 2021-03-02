/* Tell ESLint that there will be the following global variables */
/* global text:true */

let iptNum = 1;
const firstWord = text.replace(/ .*/, '');
if (firstWord.replace(/[0-9]/g, '') === 'num') {
  const value = firstWord.match(/\d+$/);
  if (value) {
    iptNum = parseInt(value);
    if (isNaN(iptNum)) {
      iptNum = 1;
    }
    text = text.substr(text.indexOf(' ') + 1);
  }
}

if (text.length === 0) {
  text = 'You gotta enter a sentence to typo, silly!';
} else if (/^help$|^\\?$|^info$/.test(text)) {
  text = "Gem's typo v1! allows even more cursed typos if you start with num[num]";
  iptNum = 0;
}

if (iptNum > 6 || iptNum < 0) {
  iptNum = 6;
}

const words = text.split(' ');
for (let i = 0; i < words.length; i++) {
  const ltrs = words[i].split('');
  for (let j = 1; j < ltrs.length - 1; j++) {
    if (Math.random() < (0.15 * iptNum)) {
      if (Math.random() < 0.7) {
        const tmp = ltrs[j];
        ltrs[j] = ltrs[j + 1];
        ltrs[j + 1] = tmp;
        j++;
      } else {
        ltrs[j] += ltrs[j];
      }
    }
  }
  words[i] = ltrs.join('');
}
text = words.join(' ');
