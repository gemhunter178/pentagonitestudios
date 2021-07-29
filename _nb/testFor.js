---
description: requires an input string "_text_" and array "_testFor_" that "_text_" will be tested against. Outputs "_trg_" that is true if triggered. Uses regex, case insensitive.
variables:
  - trg
  - text
  - testFor
  - regTest
tag: functions
order: 4
---

/* Tell ESLint that there will be a global mutable `testFor` variable and a global `text` variable */
/* global testFor:true, text */

let trg = false;
/* original regex solution from jfriend00 on stackoverflow */
const regTest = new RegExp(testFor.join('|'), 'i');
if (regTest.test(text)) {
  trg = true;
}
