/* global text:true */

/* whitespace issues */
/* eslint-disable no-tabs, indent, no-unused-expressions, no-prototype-builtins */

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
  } else if (/\btime/i.test(text)) {
    helpTrg = 8;
  }
} else if (/\s*debug\s*/.test(text)) {
  helpTrg = -2;
  text = text.replace(/\s*debug\s*/, ' ');
  if (text.charAt(0) === ' ') {
    text = text.substr(1);
  }
}

text = text.replace(/\s+to\s+/i, ' ');
text = text.replace(/\bcubic\s+/ig, 'cubic');
text = text.replace(/\bsquare\s+/ig, 'square');
const cvrtvals = text.split(' ');
if (cvrtvals.length < 2 && helpTrg === 0) {
  helpTrg = 2;
} else if (cvrtvals.length > 2) {
  cvrtvals[0] += cvrtvals[1];
  cvrtvals[1] = cvrtvals[2];
}

/* acceptable unit declarations. Yes, I get I can use an array of arrays... maybe some other day. */
const temperature = ['C', 'F', 'K'];
const length = ['m', 'cm', 'mm', 'km', 'ft', 'in', 'mi', 'nau_mile', 'league', 'light-seconds', 'AWG', 'au', 'hand', 'furlong', 'smoot', 'gabo'];
const volume = ['L', 'm^3', 'cm^3', 'gal', 'qt', 'pt', 'c', 'floz', 'tsp', 'Tbsp', 'bdft', 'gabo^3'];
const massweight = ['kg', 'g', 'metric_ton', 'ton', 'lbs', 'oz', 'ct', 'stone', 'amu', 'Jupiter', 'solar_mass'];
const area = ['m^2', 'cm^2', 'km^2', 'ft^2', 'in^2', 'acre', 'gabo^2'];
const time = ['years', 'weeks', 'days', 'hours', 'minutes', 'seconds', 'sol', 'format_time'];
const accptUnits = 'current unit types: temperature, length, area, volume, mass/weight, time';

let val = parseFloat(cvrtvals[0]);
const getUnitRegex = /^[\d.-]*/;

if (isNaN(val) && helpTrg === 0) {
  val = 1;
} else if (/format_time/.test(cvrtvals[0])) {
  helpTrg = -1;
}

if (helpTrg !== 0) {
  /* error handling, basically */
  switch (helpTrg) {
    case -2: {
      const dUnit1 = cvrtvals[0].replace(getUnitRegex, '');
      const dUnit2 = cvrtvals[1].replace(getUnitRegex, '');
      msg = 'debug: text- ' + text + ' | in0- ' + cvrtvals[0] + ' | in1- ' + cvrtvals[1] + ' | val- ' + val + ' | unit1- ' + dUnit1 + ' | unit2- ' + dUnit2;
      break;
    }

    case -1:
      msg = '"format_time" cannot be used as input here abbybaPensive ';
      break;

    case 2:
      msg = 'input format: "[val] [inputUnit] [outputUnit]" with spaces.';
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

    case 8:
      msg = 'current accepted units for time: ' + time.join(', ') + ' *format_time can only be used as output';
      break;

    default:
      msg = '!convert by Gem. Input format: "[number] [inputUnit] [outputUnit]" or "help [unittype]".| ' + accptUnits;
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
        },

        Celsius: 'C',
        celsius: 'C',
        Fahrenheit: 'F',
        fahrenheit: 'F',
        Kelvin: 'K',
        kelvin: 'K'
      },
      length: {
        m: factor(1),
        cm: factor(1 / 100),
        mm: factor(1 / 1000),
        km: factor(1000),
        ft: factor(0.3048),
        in: factor(0.0254),
        mi: factor(1609.344),
        nau_mile: { suffix: ' nautical miles', ...factor(1852) },
        league: { suffix: ' nautical leagues', ...factor(5556) },
        'light-seconds': { suffix: ' light-seconds', ...factor(299792458) },
        AWG: {
          suffix: ' American Wire Gauge',
          from: val => 0.000127 * 92 ** ((36 - val) / 39),
          to: val => -39 * Math.log(val / 0.000127) / Math.log(92) + 36
        },
        au: { suffix: ' astronomical units', ...factor(149597870700) },
        hand: { suffix: ' hands (used for horses)', ...factor(0.1016) },
        furlong: { suffix: ' furlongs', ...factor(201.168) },
        gabo: { suffix: ' gabos', ...factor(gaboVal) },
        smoot: { suffix: ' smoots', ...factor(1.7018) },

        meter: 'm',
        meters: 'm',
        centimeter: 'cm',
        centimeters: 'cm',
        millimeter: 'mm',
        millimeters: 'mm',
        kilometer: 'km',
        kilometers: 'km',
        kilometre: 'km',
        kilometres: 'km',
        foot: 'ft',
        feet: 'ft',
        inch: 'in',
        inches: 'in',
        mile: 'mi',
        miles: 'mi',
        leagues: 'league',
        astronomicalunits: 'au',
        hands: 'hand',
        gabos: 'gabo',
        smoots: 'smoot'
      },
      volume: {
        L: factor(1),
        'm^3': { suffix: ' cubic meters', ...factor(1000) },
        'cm^3': { suffix: ' cubic centimeters', ...factor(0.001) },
        gal: { suffix: ' gallons', ...factor(3.785411784) },
        qt: { suffix: ' quarts', ...factor(0.946352946) },
        c: { suffix: ' cups', ...factor(0.2365882365) },
        floz: { suffix: ' fluid ounces', ...factor(0.0295735295625) },
        tsp: { suffix: ' teaspoons', ...factor(0.00492892159375) },
        Tbsp: { suffix: ' Tablespoons', ...factor(0.01478676478125) },
        bdft: { suffix: ' board feet', ...factor(2.359737216) },
        'gabo^3': {
          suffix: ' cubic gabos',
          from: val => val * (gaboVal ** 3) * 1000,
          to: val => (val / 1000) / (gaboVal ** 3)
        },

        liter: 'L',
        liters: 'L',
        cubicmeter: 'm^3',
        cubicmeters: 'm^3',
        cubiccentimeter: 'cm^3',
        cubiccentimeters: 'cm^3',
        cubiccm: 'cm^3',
        gallon: 'gal',
        gallons: 'gal',
        quart: 'qt',
        quarts: 'qt',
        cup: 'c',
        cups: 'c',
        fluidounce: 'floz',
        fluidounces: 'floz',
        teaspoon: 'tsp',
        teaspoons: 'tsp',
        tablespoon: 'Tbsp',
        tablespoons: 'Tbsp',
        boardfeet: 'bdft',
        cubicgabo: 'gabo^3',
        cubicgabos: 'gabo^3'
      },
      massweight: {
        kg: factor(1),
        g: factor(1 / 1000),
        metric_ton: { suffix: ' metric tons', ...factor(1000) },
        ton: {
          from: val => val * 2000 / 2.20462262,
          to: val => val / 2000 * 2.20462262
        },
        lbs: factor(1 / 2.20462262),
        oz: { suffix: ' ounces', ...factor(1 / 35.27396195) },
        ct: { suffix: ' carats', ...factor(0.0002) },
        stone: { suffix: ' stone', ...factor(1 / 0.15747) },
        amu: { suffix: ' atomic mass units', ...factor(1 / 6.02217364335e+26) },
        Jupiter: { suffix: ' Jupiters', ...factor(1.898e+27) },
        solar_mass: { suffix: ' solar masses', ...factor(1.989e+30) }
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
      },
      time: {
        years: { suffix: ' non-leap years', ...factor(31536000) },
        weeks: { suffix: ' weeks', ...factor(604800) },
        days: { suffix: ' days', ...factor(86400) },
        hours: { suffix: ' hours', ...factor(3600) },
        minutes: { suffix: ' minutes', ...factor(60) },
        seconds: { suffix: ' seconds', ...factor(1) },
        sol: { suffix: ' sols (martian days)', ...factor(88775.24409) },
        format_time: {
          suffix: '',
          to: val => Math.floor(val / 31536000) + 'y ' + Math.floor((val / 86400) % 365) + 'd ' + Math.floor((val / 3600) % 24) + 'h ' + Math.floor((val / 60) % 60) + 'm ' + (val % 60) + 's'
        }
      }
    };
  })();
  if (conversions.temperature.hasOwnProperty(unit1) && conversions.temperature.hasOwnProperty(unit2)) {
    if (typeof (conversions.temperature[unit1]) === 'string') { unit1 = conversions.temperature[unit1]; }
    if (typeof (conversions.temperature[unit2]) === 'string') { unit2 = conversions.temperature[unit2]; }
    val = conversions.temperature[unit1].from(val);
    val = conversions.temperature[unit2].to(val);
  } else if (conversions.length.hasOwnProperty(unit1) && conversions.length.hasOwnProperty(unit2)) {
    if (typeof (conversions.length[unit1]) === 'string') { unit1 = conversions.length[unit1]; }
    if (typeof (conversions.length[unit2]) === 'string') { unit2 = conversions.length[unit2]; }
    val = conversions.length[unit1].from(val);
    if (conversions.length[unit1].suffix !== undefined) {
      unit1 = conversions.length[unit1].suffix;
    }
    val = conversions.length[unit2].to(val);
    if (conversions.length[unit2].suffix !== undefined) {
      unit2 = conversions.length[unit2].suffix;
    }
  } else if (conversions.volume.hasOwnProperty(unit1) && conversions.volume.hasOwnProperty(unit2)) {
    if (typeof (conversions.volume[unit1]) === 'string') { unit1 = conversions.volume[unit1]; }
    if (typeof (conversions.volume[unit2]) === 'string') { unit2 = conversions.volume[unit2]; }
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
  } else if (conversions.time.hasOwnProperty(unit1) && conversions.time.hasOwnProperty(unit2)) {
    val = conversions.time[unit1].from(val);
    if (conversions.time[unit1].suffix !== undefined) {
      unit1 = conversions.time[unit1].suffix;
    }
    val = conversions.time[unit2].to(val);
    if (conversions.time[unit2].suffix !== undefined) {
      unit2 = conversions.time[unit2].suffix;
    }
  } else {
    calc = false;
    msg = 'Either unit types do not match or not implemented | ' + accptUnits;
  }

  if (calc) {
    if (typeof val === 'number') {
      val = (val.toPrecision(6)).replace(/\.0+\b/, '');
    }
    msg = origVal + unit1 + ' = ' + val + unit2;
  }
}

msg;
