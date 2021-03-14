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
const massweight = ['kg', 'g', 'metric_ton', 'ton', 'lbs', 'oz', 'ct', 'Jupiter', 'solar_mass'];
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
  if (temperature.includes(unit1) && temperature.includes(unit2)) {
    switch (unit1) {
      case 'C':
        break;

      case 'F':
        val = (val - 32) * 5 / 9;
        break;

      case 'K':
        val = val - 273.15;
        break;

      default:
        calc = false;
        msg = 'error tmp1';
        break;
    }
    switch (unit2) {
      case 'C':
        break;

      case 'F':
        val = val * 1.8 + 32;
        break;

      case 'K':
        val = val + 273.15;
        break;

      default:
        calc = false;
        msg = 'error tmp2';
        break;
    }
  } else if (length.includes(unit1) && length.includes(unit2)) {
    switch (unit1) {
      case 'm':
        break;

      case 'cm':
        val = val / 100;
        break;

      case 'mm':
        val = val / 1000;
        break;

      case 'km':
        val = val * 1000;
        break;

      case 'ft':
        val = val * 0.3048;
        break;

      case 'in':
        val = val * 0.0254;
        break;

      case 'mi':
        val = val * 1609.344;
        break;

      case 'light-seconds':
        val = val * 299792458;
        unit1 = ' light-seconds';
        break;

      case 'au':
        val = val * 149597870700;
        unit1 = ' astronomical units';
        break;

      case 'furlong':
        val = val * 201.168;
        unit1 = ' furlongs';
        break;

      case 'smoot':
        val = val * 1.7018;
        unit1 = ' smoots';
        break;

      case 'gabo':
        val = val * gaboVal;
        unit1 = ' gabos';
        break;

      default:
        calc = false;
        msg = 'err len1';
        break;
    }
    switch (unit2) {
      case 'm':
        break;

      case 'cm':
        val = val * 100;
        break;

      case 'mm':
        val = val * 1000;
        break;

      case 'km':
        val = val / 1000;
        break;

      case 'ft':
        val = val / 0.3048;
        break;

      case 'in':
        val = val / 0.0254;
        break;

      case 'mi':
        val = val / 1609.344;
        break;

      case 'light-seconds':
        val = val / 299792458;
        unit2 = ' light-seconds';
        break;

      case 'au':
        val = val / 149597870700;
        unit2 = ' astronomical units';
        break;

      case 'furlong':
        val = val / 201.168;
        unit2 = ' furlongs';
        break;

      case 'smoot':
        val = val / 1.7018;
        unit2 = ' smoots';
        break;

      case 'gabo':
        val = val / gaboVal;
        unit2 = ' gabos';
        break;

      default:
        calc = false;
        msg = 'err len2';
        break;
    }
  } else if (volume.includes(unit1) && volume.includes(unit2)) {
    switch (unit1) {
      case 'L':
        break;

      case 'm^3':
        val = val * 1000;
        unit1 = ' cubic meters';
        break;

      case 'cm^3':
        val = val * 0.001;
        unit1 = ' cubic centimeters';
        break;

      case 'gal':
        val = val * 3.785411784;
        unit1 = ' gallons';
        break;

      case 'qt':
        val = val * 0.946352946;
        unit1 = ' quarts';
        break;

      case 'pt':
        val = val * 0.473176473;
        unit1 = ' pints';
        break;

      case 'c':
        val = val * 0.2365882365;
        unit1 = ' cups';
        break;

      case 'floz':
        val = val * 0.0295735295625;
        unit1 = ' fluid ounces';
        break;

      case 'tsp':
        val = val * 0.00492892159375;
        unit1 = ' teaspoons';
        break;

      case 'Tbsp':
        val = val * 0.01478676478125;
        unit1 = ' Tablespoons';
        break;

      case 'bdft':
        val = val * 2.359737216;
        unit1 = ' board feet';
        break;

      case 'gabo^3':
        val = val * (gaboVal ** 3) * 1000;
        unit1 = ' cubic gabos';
        break;

      default:
        calc = false;
        msg = 'err vol1';
        break;
    }
    switch (unit2) {
      case 'L':
        break;

      case 'm^3':
        val = val / 1000;
        unit2 = ' cubic meters';
        break;

      case 'cm^3':
        val = val / 0.001;
        unit2 = ' cubic centimeters';
        break;

      case 'gal':
        val = val / 3.785411784;
        unit2 = ' gallons';
        break;

      case 'qt':
        val = val / 0.946352946;
        unit2 = ' quarts';
        break;

      case 'pt':
        val = val / 0.473176473;
        unit2 = ' pints';
        break;

      case 'c':
        val = val / 0.2365882365;
        unit2 = ' cups';
        break;

      case 'floz':
        val = val / 0.0295735295625;
        unit2 = ' fluid ounces';
        break;

      case 'tsp':
        val = val / 0.00492892159375;
        unit2 = ' teaspoons';
        break;

      case 'Tbsp':
        val = val / 0.01478676478125;
        unit2 = ' Tablespoons';
        break;

      case 'bdft':
        val = val / 2.359737216;
        unit2 = ' board feet';
        break;

      case 'gabo^3':
        val = (val / 1000) / (gaboVal ** 3);
        unit2 = ' cubic gabos';
        break;

      default:
        calc = false;
        msg = 'err vol2';
        break;
    }
  } else if (massweight.includes(unit1) && massweight.includes(unit2)) {
    switch (unit1) {
      case 'kg':
        break;

      case 'g':
        val = val / 1000;
        break;

      case 'metric_ton':
        val = val * 1000;
        unit1 = ' metric tons';
        break;

      case 'ton':
        val = val * 2000 / 2.20462262;
        break;

      case 'lbs':
        val = val / 2.20462262;
        break;

      case 'oz':
        val = val / 35.27396195;
        unit1 = ' ounces';
        break;

      case 'ct':
        val = val * 0.0002;
        unit1 = ' carats';
        break;

      case 'Jupiter':
        val = val * 1.898e+27;
        unit1 = ' Jupiters';
        break;

      case 'solar_mass':
        val = val * 1.989e+30;
        unit1 = ' solar masses';
        break;

      default:
        calc = false;
        msg = 'err m/w1';
        break;
    }
    switch (unit2) {
      case 'kg':
        break;

      case 'g':
        val = val * 1000;
        break;

      case 'metric_ton':
        val = val / 1000;
        unit2 = ' metric tons';
        break;

      case 'ton':
        val = val / 2000 * 2.20462262;
        break;

      case 'lbs':
        val = val * 2.20462262;
        break;

      case 'oz':
        val = val * 35.27396195;
        unit2 = ' ounces';
        break;

      case 'ct':
        val = val / 0.0002;
        unit2 = ' carats';
        break;

      case 'Jupiter':
        val = val / 1.898e+27;
        unit2 = ' Jupiters';
        break;

      case 'solar_mass':
        val = val / 1.989e+30;
        unit2 = ' solar masses';
        break;

      default:
        calc = false;
        msg = 'err m/w2';
        break;
    }
  } else if (area.includes(unit1) && area.includes(unit2)) {
    switch (unit1) {
      case 'm^2':
        unit1 = ' square meters';
        break;

      case 'cm^2':
        val = val * 0.0001;
        unit1 = ' square centimeters';
        break;

      case 'km^2':
        val = val * 1000000;
        unit1 = ' square kilometers';
        break;

      case 'ft^2':
        val = val * 0.09290304;
        unit1 = ' square feet';
        break;

      case 'in^2':
        val = val * 0.00064516;
        unit1 = ' square inches';
        break;

      case 'acre':
        val = val * 4046.8564224;
        unit1 = ' acres';
        break;

      case 'gabo^2':
        val = val * (gaboVal ** 2);
        unit1 = ' square gabos';
        break;

      default:
        calc = false;
        msg = 'err ara1';
        break;
    }
    switch (unit2) {
      case 'm^2':
        unit2 = ' square meters';
        break;

      case 'cm^2':
        val = val / 0.0001;
        unit2 = ' square centimeters';
        break;

      case 'km^2':
        val = val / 1000000;
        unit2 = ' square kilometers';
        break;

      case 'ft^2':
        val = val / 0.09290304;
        unit2 = ' square feet';
        break;

      case 'in^2':
        val = val / 0.00064516;
        unit2 = ' square inches';
        break;

      case 'acre':
        val = val / 4046.8564224;
        unit2 = ' acres';
        break;

      case 'gabo^2':
        val = val / (gaboVal ** 2);
        unit2 = ' square gabos';
        break;

      default:
        calc = false;
        msg = 'err ara2';
        break;
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
