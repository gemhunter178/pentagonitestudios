/* Tell ESLint that there will be a global `user` variable */
/* global user */

let gaus = -5;
while (gaus > 25 || gaus < -4.5) {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  gaus = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  gaus = gaus * 2.5;
}
const fsh = 5 + gaus;
const msg = ['Teeny fish! lycelGib ',
  'Oh, I caught one lycelWhatif ',
  'Okay lycelIdk ',
  'Not bad! lycelYes ',
  'Pretty good! lycelCool ',
  'What a catch! lycelYay ',
  "That's a big 'un lycelAAA ",
  'Those are rare! lycelBlush ',
  'lycelW lycelW lycelW '];
let sz = 0;
let fishoutput = ' ';
if ((Math.random()) < 0.9) {
  if (fsh > 20.0) {
    sz = 8;
  } else if (fsh > 10.0) {
    sz = 7;
  } else if (fsh > 7.5) {
    sz = 6;
  } else if (fsh > 6.25) {
    sz = 5;
  } else if (fsh > 5.25) {
    sz = 4;
  } else if (fsh > 4.75) {
    sz = 3;
  } else if (fsh > 3.75) {
    sz = 2;
  } else if (fsh > 2.5) {
    sz = 1;
  }
  fishoutput = user + ' caught a fish of ' + fsh.toFixed(2) + 'kg! (' + (fsh * 2.20462).toFixed(2) + 'lbs) ' + msg[sz];
  if (/6[.]*9/.test(fishoutput)) {
    fishoutput += '- nice ';
  }
} else {
  fishoutput = 'Oh no! The fish escaped!! lycelHands ';
}
