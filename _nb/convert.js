---
description: |
  [WIP] requires an input string '_text_' in the form '[number][inputUnit] to [outputUnit]' or '[number][inputUnit] [outputUnit]'. this will attempt to convert the input to output.
variables:
  - text
  - msg
  - val
  - helpTrg
  - cvrtvals
  - temperature
  - length
  - volume
  - massweight
  - area
tag: functions
order: 4
---
/* global text:true */

/* whitespace issues */
/* eslint-disable no-tabs, indent, no-unused-expressions */

let msg;
let helpTrg = 0;
if (/\bhelp\b/i.test(text) || text.length === 0) {
  helpTrg = 1;
  if (/\btemp/i.test(text)) {
    helpTrg = 3;
  } else if (/\blen/i.test(text)) {
    helpTrg = 4;
  } else if (/\bvol/i.test(text)) {
    helpTrg = 5;
  } else if (/\bmass|\bwei/i.test(text)) {
    helpTrg = 6;
  } else if (/\barea/i.test(text)) {
    helpTrg = 7;
  }
} else if (/\s*debug\s*/.test(text)) {
  helpTrg = -2;
  text = text.replace(/\s*debug\s*/, ' ');
}

text = text.replace(/\s+to\s+/i, ' ');
const cvrtvals = text.split(' ');
if (cvrtvals.length < 2) {
  helpTrg = 1;
}
/* acceptable unit declarations. Yes, I get I can use an array of arrays... maybe some other day. */
const temperature = ['C', 'F', 'K'];
const length = ['m', 'cm', 'mm', 'km', 'ft', 'in', 'mi', 'light-seconds', 'au', 'furlong', 'smoot', 'gabo'];
const volume = ['L', 'm^3', 'cm^3', 'gal', 'qt', 'pt', 'c', 'floz', 'tsp', 'Tbsp', 'bdft', 'gabo^3'];
const massweight = ['kg', 'g', 'metric_ton', 'ton', 'lbs', 'oz', 'ct', 'amu', 'Jupiter', 'solar_mass'];
const area = ['m^2', 'cm^2', 'km^2', 'ft^2', 'in^2', 'acre', 'gabo^2'];
const accptUnits = 'current unit types: temperature, length, area, volume, mass/weight';

let val = parseFloat(cvrtvals[0]);
const getUnitRegex = /^[\d.-]*/;

if (isNaN(val) && helpTrg === 0) {
  helpTrg = 2;
} else if (/format_time/.test(cvrtvals[0])) {
  helpTrg = -1;
}

if (helpTrg !== 0) {
  /* error handling, basically */
  switch (helpTrg) {
    case -2: {
      const dUnit1 = cvrtvals[0].replace(getUnitRegex, '');
      const dUnit2 = cvrtvals[1].replace(getUnitRegex, '');
      msg = 'debug: text- ' + text + ' | val- ' + val + ' | unit1- ' + dUnit1 + ' | unit2- ' + dUnit2;
      break;
    }

    case -1:
      msg = '"format_time" cannot be used as input here abbybaPensive ';
      break;

    case 2:
      msg = 'requires a value to convert from lycelIdk';
      break;

    case 3:
      msg = 'current accepted units for temperature: ' + temperature.join(', ');
      break;

    case 4:
      msg = 'current accepted units for length: ' + length.join(', ');
      break;

    case 5:
      msg = 'current accepted units for volume: ' + volume.join(', ');
      break;

    case 6:
      msg = 'current accepted units for mass/earth-relative weight: ' + massweight.join(', ');
      break;

    case 7:
      msg = 'current accepted units for area: ' + area.join(', ');
      break;

    default:
      msg = '!convert by Gem. Input format: "[number][inputUnit] [outputUnit]" or "help [unittype]". 6 sig figs results | ' + accptUnits;
      break;
  }
} else {
  let unit1 = cvrtvals[0].replace(getUnitRegex, '');
  let unit2 = cvrtvals[1].replace(getUnitRegex, '');
  let calc = true;
  const origVal = val;
  const gaboVal = 1.8288;
  const conversions = (function () {
    const factor = i => ({
        from: j => j * i,
        to: j => j / i
      });
    return {
      temperature: {
        C: factor(1),
        F: {
          from: val => (val - 32) * 5 / 9,
          to: val => val * 1.8 + 32
        },
        K: {
          from: val => val - 273.15,
          to: val => val + 273.15
        }
      },
      length: {
        m: factor(1),
        cm: factor(1 / 100),
        mm: factor(1 / 1000),
        km: factor(1000),
        ft: factor(0.3048),
        in: factor(0.0254),
        mi: factor(1609.344),
        'light-seconds': {
          suffix: ' light-seconds',
          ...factor(299792458)
        },
        au: {
          suffix: ' astronomical units',
          ...factor(1 / 149597870700)
        },
        furlong: {
          suffix: ' furlongs',
          ...factor(201.168)
        },
        gabo: {
          suffix: ' gabos',
          ...factor(gaboVal)
        },
        smoot: {
          suffix: ' smoots',
          ...factor(1.7018)
        }
      },
      volume: {
        L: factor(1),
        'm^3': {
          suffix: ' cubic meters',
          ...factor(1000)
        },
        'cm^3': {
          suffix: ' cubic centimeters',
          ...factor(0.001)
        },
        gal: {
          suffix: ' gallons',
          ...factor(3.785411784)
        },
        qt: {
          suffix: ' quarts',
          ...factor(0.946352946)
        },
        c: {
          suffix: ' cups',
          ...factor(0.2365882365)
        },
        floz: {
          suffix: ' fluid ounces',
          ...factor(0.0295735295625)
        },
        tsp: {
          suffix: ' teaspoons',
          ...factor(0.00492892159375)
        },
        Tbsp: {
          suffix: ' Tablespoons',
          ...factor(0.01478676478125)
        },
        bdft: {
          suffix: ' board feet',
          ...factor(2.359737216)
        },
        'gabo^3': {
          suffix: ' cubic gabos',
          from: val => val * (gaboVal ** 3) * 1000,
          to: val => (val / 1000) / (gaboVal ** 3)
        }
      },
      massweight: {
        kg: factor(1),
        g: factor(1 / 1000),
        metric_ton: {
          suffix: ' metric tons',
          ...factor(1000)
        },
        ton: {
          from: val => val * 2000 / 2.20462262,
          to: val => val / 2000 * 2.20462262
        },
        lbs: factor(1 / 2.20462262),
        oz: {
          suffix: ' ounces',
          ...factor(1 / 35.27396195)
        },
        ct: {
          suffix: ' carats',
          ...factor(0.0002)
        },
        amu: {
          suffix: ' atomic mass units',
          ...factor(1 / 6.02217364335e+26)
        },
        Jupiter: {
          suffix: ' Jupiters',
          ...factor(1.898e+27)
        },
        solar_mass: {
          suffix: ' solar masses',
          ...factor(1.989e+30)
        }
      },
      area: {
        'm^2': {
          suffix: ' square meters',
          ...factor(1)
        },
        'cm^2': { suffix: ' square centimeters', ...factor(0.0001) },
        'km^2': { suffix: ' square kilometers', ...factor(1000000) },
        'ft^2': { suffix: ' square feet', ...factor(0.09290304) },
        'in^2': { suffix: ' square inches', ...factor(0.00064516) },
        acre: { suffix: ' acres', ...factor(4046.8564224) },
        'gabo^2': {
          suffix: ' square gabos',
          from: val => val * (gaboVal ** 2),
          to: val => val / (gaboVal ** 2)
        }
      }
    };
  })();
  if (conversions.temperature.hasOwnProperty(unit1) && conversions.temperature.hasOwnProperty(unit2)) {
    val = conversions.temperature[unit1].from(val);
    val = conversions.temperature[unit2].to(val);
  } else if (conversions.length.hasOwnProperty(unit1) && conversions.length.hasOwnProperty(unit2)) {
    val = conversions.length[unit1].from(val);
    if (conversions.length[unit1].suffix !== undefined) {
      unit1 = conversions.length[unit1].suffix;
    }
    val = conversions.length[unit2].to(val);
    if (conversions.length[unit2].suffix !== undefined) {
      unit2 = conversions.length[unit2].suffix;
    }
  } else if (conversions.volume.hasOwnProperty(unit1) && conversions.volume.hasOwnProperty(unit2)) {
    val = conversions.volume[unit1].from(val);
    if (conversions.volume[unit1].suffix !== undefined) {
      unit1 = conversions.volume[unit1].suffix;
    }
    val = conversions.volume[unit2].to(val);
    if (conversions.volume[unit2].suffix !== undefined) {
      unit2 = conversions.volume[unit2].suffix;
    }
  } else if (conversions.massweight.hasOwnProperty(unit1) && conversions.massweight.hasOwnProperty(unit2)) {
    val = conversions.massweight[unit1].from(val);
    if (conversions.massweight[unit1].suffix !== undefined) {
      unit1 = conversions.massweight[unit1].suffix;
    }
    val = conversions.massweight[unit2].to(val);
    if (conversions.massweight[unit2].suffix !== undefined) {
      unit2 = conversions.massweight[unit2].suffix;
    }
  } else if (conversions.area.hasOwnProperty(unit1) && conversions.area.hasOwnProperty(unit2)) {
    val = conversions.area[unit1].from(val);
    if (conversions.area[unit1].suffix !== undefined) {
      unit1 = conversions.area[unit1].suffix;
    }
    val = conversions.area[unit2].to(val);
    if (conversions.area[unit2].suffix !== undefined) {
      unit2 = conversions.area[unit2].suffix;
    }
  } else {
    calc = false;
    msg = 'Either unit types do not match or it has yet to be implemented smolShrug | ' + accptUnits;
  }

  if (calc) {
    msg = origVal + unit1 + ' = ' + val.toPrecision(6) + unit2;
  }
}

msg;
