---
description: |
  [WIP] requires an input string '_text_' in the form '[number][inputUnit] to [outputUnit]' or '[number][inputUnit] [outputUnit]'. this will attempt to convert the input to output.
variables:
  - text
  - msg
  - val
  - helpTrg
tag: functions
order: 4
---
/* These ESLint errors should be handled, but for now I just want to get it to pass */
/* eslint-disable no-tabs*/

var msg;
let helpTrg = 0;
if (/\bhelp\b/i.test(text)) {
	helpTrg = 1;
	if (/temp/i.test(text)) {
		helpTrg = 3;
	}
} else {
	text = text.replace(/\s+to/i,'');
	const temperature = ['C','F','K'];
	/*const len = ['ft','m','in','cm','mm','gabo'];*/
	cvrtvals = text.split(' ');
	if (cvrtvals.length < 2) {
		helpTrg = 1;
	}
}
let val = parseFloat(cvrtvals[0]);
if (isNaN(val)) {
	helpTrg = 2;
}
if (helpTrg !== 0) {
	/* error handling, basically */
	switch (helpTrg) {
		
		case 1:
		  msg = 'Converter program v1 by Gem. Please enter convert in the form "[number][inputUnit] [outputUnit]" or "help [unittype]" for implemented units';
		  break;
		
		case 2:
		  msg = 'requires a value to convert from lycelIdk';
		  break;
		
		case 3:
		  msg = 'current accepted units for temperature: ' + temperature.join(', ');
		  break;
		
		case default:
		  msg = 'Converter program v1 by Gem. Please enter convert in the form "[number][inputUnit] [outputUnit]" or "help [unittype]" for implemented units';
		  break;
		
	}
} else {
	let unit1 = cvrtvals[0].replace(/\d/,'');
	let unit2 = cvrtvals[1].replace(/\d/,'');
	let calc = true;
	let testFor = new RegExp('\\b('temperature.join('|')')\\b');
	if (testFor.test(unit1) && testFor.test(unit2)){
		switch (unit1) {
			
			case 'C':
			  break;
			
			case 'F':
			  val = (val-32)*5/9;
			  break;
			
			case 'K':
			  val = val-273.15;
			  break;
			
			default:
			  calc = false;
			  msg = 'error parsing temperature conversion, start';
			  break;
			
		}
		switch (unit2) {
			
			case 'C':
			  break;
			
			case 'F':
			  val = val*1.8+32;
			  break;
			
			case 'K':
			  val = val+273.15;
			  break;
			
			default:
			  calc = false;
			  msg = 'error parsing temperature conversion, end';
			  break;
			
		}
	} else {
		calc = false;
		msg = 'Either unit types do not match or it has yet to be implemented smolShrug | current types accepted: temperature';
	}
	
	if (calc) {
		msg = cvrtvals[0] + ' = ' + val + unit2;
	}		
}

msg;