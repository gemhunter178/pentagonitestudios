/* This code is intentionally left off the nightbot.html list */

/* Tell ESLint that there will be the following global variables */
/* global user, text, desc */

/* These ESLint errors should be handled, but for now I just want to get it to pass */
/* eslint-disable no-unused-expressions, no-case-declarations, no-unused-expressions */

/* previous message on Kae's (for future implementation maybe? (Abi came up with this)
Gem is an AWESOME artist and mod(who can do everything)!! Follow her on Twitter! https://twitter.com/gemhunter178 and commission her on discord!! */

const messages = [
  'does art, grows cacti, and knows a lot of fun facts!',
  'wrangles with nightbot more often than not...',
  'is looking for that one missing semicolon in her code',
  'makes overly complcated commands for simple tasks (like this one)',
  'can also do woodwork and make cabochon gems',
  'thinks Gabo should probably go to sleep',
  'is hoping everyone is having a good day',
  'has attempted flameworking glass before, semi-successfully',
  'has a rather extensive rock and mineral collection',
  'thinks Shirley Temples (drink) are amazing! (she does not know enough about the person)',
  'currently exists in EST/EDT',
  'can do traditional and digital art, both in 2D and 3D',
  'probably plays too much ACNH...or Stardew Valley #notsponsored',
  'is taking commissions on a per-request basis',
  'literally has a few hundred cacti and succulents',
  'plays piano and flute but also knows some guitar, ukulele, and general percussion',
  'wants to remind chat that they are all cuties!',
  'says Trans Rights! TransgenderPride',
  'is hoping this array is long enough to provide a good variation of messages',
  'also takes care of a good number of airplants',
  'can do imtermediate origami',
  'has been to active mines for rocks!',
  'has all 7 continents represented in her rock collection!',
  'is attempting to help out with endangered cacti breeding',
  'definitely needs more sleep',
  'can help out with making nightbot commands!',
  'knows how to bake and decorate cakes!',
  'occasionally does photography!',
  "is hoping that all of these text options don't have a typo...",
  'did winter guard before! She actually has colour guard flag right next to her desk!',
  'played flute and was then drum major in marching band!',
  'has a background in traditional art! (coloured pencil, graphite, acrylic, oil etc.)',
  'will probably open a shop...eventually...?',
  'loves variegated plants...but they do be expensive',
  'is the baker of her house!',
  'uses She/Her pronouns!'
];

const promo = [
  'bluesky! https://bsky.app/profile/gemmakesart.bsky.social',
  'insta! https://www.instagram.com/gemmakesart/',
  'twitch!...eventually https://www.twitch.tv/gemhunter178'
];

let showPromo = true;
if (/nopromo/i.test(text)) {
  showPromo = false;
}

let msgNum = parseInt(text.replace(/\D/g, ''));
let msgFlavor = messages[Math.floor(Math.random() * messages.length)];
if (!isNaN(msgNum)) {
  msgNum = msgNum % messages.length;
  msgFlavor = msgNum + ': ' + messages[msgNum];
}

let msg = desc + ' - Gem (she/her) - ' + msgFlavor;
if (showPromo) {
  let prmNum = 0;
  if (Math.random() > 0.7) {
    prmNum = 1 + Math.floor(Math.random() * (promo.length - 1));
  }
  msg += '  Follow her ' + promo[prmNum];
}

if (/^Gemhunter178$/i.test(user)) {
  const opt = text.split(' ');
  switch (opt[0]) {
    case 'wave':
      'Gem says hi and apologises if she missed someone!';
      break;

    case 'sleep':
      if (opt.length > 1) {
        msg = opt[1].toUpperCase() + ' GO TO SLEEP!';
      } else {
        msg = 'GO TO SLEEP!';
      }
      msg;
      break;

    case 'typo':
      let wrd1 = 'Gem';
      let wrd2 = 'her';
      if (opt.length > 1) {
        wrd1 = opt[1];
        wrd2 = 'their';
      }
      msg = 'On behalf of ' + wrd1 + ', we would like to apologise for ' + wrd2 + ' typos';
      /* just the function from typo_0.json */
      const words = msg.split(' ');
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
      msg = words.join(' ') + ' ';
      msg;
      break;

    case 'override':
      msg;
      break;

    default:
      'Hiya Gem!';
      break;
  }
} else {
  msg;
}
