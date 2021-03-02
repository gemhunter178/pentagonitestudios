/* Tell ESLint that there will be the following global variables */
/* global text:true */

if (text.length === 0) {
  text = 'You gotta enter a sentence to typo, silly!';
}
const words = text.split(' ');
for (let i = 0; i < words.length; i++) {
  const ltrs = words[i].split('');
  for (let j = 1; j < ltrs.length - 1; j++) {
    if (Math.random() < 0.15) {
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
