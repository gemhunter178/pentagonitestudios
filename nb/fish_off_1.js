let fishoutput;

if (Math.random() <= 0.1) {
  fishoutput = "You caught a fish! Kappa";
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
    'abibeaLurk',
  ];
  fishoutput = "Go fish. " + endEmote[Math.floor(Math.random() * endEmote.length)];
}