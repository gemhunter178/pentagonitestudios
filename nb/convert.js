/* These ESLint errors should be handled, but for now I just want to get it to pass */
/* eslint-disable no-tabs, indent */

let msg;
let helpTrg = 0;
if (/\bhelp\b/i.test(text) || text.length === 0) {
  helpTrg = 1;
  if (/\btemp/i.test(text)) {
    helpTrg = 3;
  } else if (/\blength/i.test(text)) {
    helpTrg = 4;
  } else if (/\bvol/i.test(text)) {
    helpTrg = 5;
  }
}

text = text.replace(/\s+to/i, '');
let cvrtvals = text.split(' ');
if (cvrtvals.length < 2) {
  helpTrg = 1;
}

const temperature = ['C', 'F', 'K'];
const length = ['m', 'cm', 'mm', 'km', 'ft', 'in', 'mi', 'furlong', 'smoot', 'gabo'];
const volume = ['L', 'm^3', 'cm^3', 'gal', 'qt', 'pt', 'c', 'floz', 'tsp', 'Tbsp', 'gabo^3'];
const accptUnits = 'current types accepted: temperature, length, volume';

let val = parseFloat(cvrtvals[0]);
if (isNaN(val) && helpTrg === 0) {
  helpTrg = 2;
} else if (val <= 0) {
  helpTrg = -1;
}

if (helpTrg !== 0) {
  /* error handling, basically */
  switch (helpTrg) {
    case -1:
      msg = 'You thought entering that value would be funny, did you?';
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
    
    default:
      msg = '!convert by Gem. Please enter convert in the form "[number][inputUnit] [outputUnit]" or "help [unittype]" for implemented units. Answers in 6 sig figs | ' + accptUnits;
      break;
  }
} else {
  const unit1 = cvrtvals[0].replace(/\b[\d\.]*/, '');
  const unit2 = cvrtvals[1].replace(/\b[\d\.]*/, '');
  let calc = true;
  const gaboVal = 1.8288;
  if (temperature.includes(unit1) && temperature.includes(unit2)) {
    switch (unit1) {
      case 'C':
        break;
      
      case 'F':
        val = (val-32) * 5/9;
        break;
      
      case 'K':
        val = val - 273.15;
        break;
      
      default:
        calc = false;
        msg = 'error in temperature conversion, start';
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
        msg = 'error in temperature conversion, end';
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
      
      case 'furlong':
        val = val * 201.168;
        break;
      
      case 'smoot':
        val = val * 1.7018;
        break;
      
      case 'gabo':
        val = val * gaboVal;
        break;
      
      default:
        calc = false;
        msg = 'error in length conversion, start';
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
      
      case 'furlong':
        val = val / 201.168;
        break;
      
      case 'smoot':
        val = val / 1.7018;
        break;
      
      case 'gabo':
        val = val / gaboVal;
        break;
      
      default:
        calc = false;
        msg = 'error in length conversion, end';
        break;
    }
  } else if (volume.includes(unit1) && volume.includes(unit2)) {
    switch (unit1) {
      case 'L':
        break;
      
      case 'm^3':
        val = val * 1000;
        break;
      
      case 'cm^3':
        val = val * 0.001;
        break;
      
      case 'gal':
        val = val * 3.785411784;
        break;
      
      case 'qt':
        val =  val * 0.946352946;
        break;
      
      case 'pt':
        val = val * 0.473176473;
        break;
      
      case 'c':
        val = val * 0.2365882365;
        break;
      
      case 'floz':
        val = val * 0.0295735295625;
        break;
      
      case 'tsp':
        val = val * 0.00492892159375;
        break;
      
      case 'Tbsp':
        val = val * 0.01478676478125;
        break;
      
      case 'gabo^3':
        val = val * (gaboVal ** 3) * 1000;
        break;
      
      default:
        calc = false;
        msg = 'error in volume conversion, start';
        break;
    }
    switch (unit2) {
      case 'L':
        break;
      
      case 'm^3':
        val = val / 1000;
        break;
      
      case 'cm^3':
        val = val / 0.001;
        break;
      
      case 'gal':
        val = val / 3.785411784;
        break;
      
      case 'qt':
        val =  val / 0.946352946;
        break;
      
      case 'pt':
        val = val / 0.473176473;
        break;
      
      case 'c':
        val = val / 0.2365882365;
        break;
      
      case 'floz':
        val = val / 0.0295735295625;
        break;
      
      case 'tsp':
        val = val / 0.00492892159375;
        break;
      
      case 'Tbsp':
        val = val / 0.01478676478125;
        break;
      
      case 'gabo^3':
        val = (val / 1000) / (gaboVal ** 3);
        break;
      
      default:
        calc = false;
        msg = 'error in volume conversion, end';
        break;
    }
    
  } else {
    calc = false;
    msg = 'Either unit types do not match or it has yet to be implemented smolShrug | ' + accptUnits + ' | debug: val-' + val + ' unit1-' + unit1 + ' unit2-' + unit2;
  }
  
  if (calc) {
    msg = cvrtvals[0] + ' = ' + val.toPrecision(6) + unit2;
  }    
}

msg;