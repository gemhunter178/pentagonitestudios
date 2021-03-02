/* Tell ESLint that there will be a global mutable `testFor` variable and a global `text` variable */
/* global testFor:true, text */

let trg = false;
/* original regex solution from jfriend00 on stackoverflow */
const regTest = new RegExp(testFor.join('|'), 'i');
if (regTest.test(text)) {
  trg = true;
}
