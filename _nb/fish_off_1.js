---
description: |
  an alternative to `fish_off.js` based on Gabo's code. Use `fish_off_1.js` to disable fishing with some quips.
variables:
  - fishoutput
  - endEmote
tag: specific commands
order: 3
---

let fishoutput;

if (Math.random() <= 0.1) {
  fishoutput = 'You caught a fish! Kappa';
} else {
  const endEmote = [
    'pcrowEyes',
    'bryce4Eyes',
    'cjyaEyes',
    'lycelEyes',
    'maizEyes',
    'archit3Eyes',
    'smolEyes',
    'abbybaTea',
    'lycelW',
    'pcrowO',
    'maizFlushed',
    'pcrowW',
    'kaestr1Eyes',
    'abibeaLurk'
  ];
  fishoutput = 'Go fish. ' + endEmote[Math.floor(Math.random() * endEmote.length)];
}
