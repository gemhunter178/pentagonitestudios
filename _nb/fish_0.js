---
description: The original fish code! (with some added functionality to work with the current command) just change `fish_1.js` to `fish_0.js` to use the legacy code
variables:
  - fsh
  - msg
  - sz
  - fishoutput
tag: specific commands
order: 0
---

/* Tell ESLint that there will be a global `user` variable */
/* global user */

let fsh = 5 + Math.random() * 95;
const msg = ['Teeny fish! 🐟 ',
  'Not bad! lycelYes ',
  'What a catch! lycelYay ',
  "That's a big 'un lycelCool "
];
let sz = 0;
let fishoutput = ' ';
if ((Math.random() + fsh / 300) < 0.9) {
  if (fsh > 75) {
    sz = 3;
  } else if (fsh > 50) {
    sz = 2;
  } else if (fsh > 25) {
    sz = 1;
  }
  fsh = fsh / 10;
  fishoutput = user + ' caught a fish of ' + fsh.toFixed(2) + 'kg! (' + (fsh * 2.20462).toFixed(2) + 'lbs) ' + msg[sz];
} else {
  fishoutput = 'Oh no! The fish escaped!! smolPanic ';
}
