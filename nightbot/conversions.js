const gaboVal = 1.8288 * 73 / 72;
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
      gauge: 'AWG',
      gaugewire: 'AWG',
      astronomicalunits: 'au',
      hands: 'hand',
      gabos: 'gabo',
      smoots: 'smoot'
    },
    volume: {
      L: factor(1),
      mL: factor(0.001),
      'm^3': { suffix: ' cubic meters', ...factor(1000) },
      'cm^3': { suffix: ' cubic centimeters', ...factor(0.001) },
      gal: { suffix: ' gallons', ...factor(3.785411784) },
      qt: { suffix: ' quarts', ...factor(0.946352946) },
      pt: { suffix: ' pints', ...factor(0.473176473) },
      c: { suffix: ' cups', ...factor(0.2365882365) },
      floz: { suffix: ' fluid ounces', ...factor(0.0295735295625) },
      tsp: { suffix: ' teaspoons', ...factor(0.00492892159375) },
      Tbsp: { suffix: ' Tablespoons', ...factor(0.01478676478125) },
      stick_of_butter: { suffix: ' US sticks of butter', ...factor(0.11829411825) },
      bdft: { suffix: ' board feet', ...factor(2.359737216) },
      'gabo^3': {
        suffix: ' cubic gabos',
        from: val => val * (gaboVal ** 3) * 1000,
        to: val => (val / 1000) / (gaboVal ** 3)
      },

      liter: 'L',
      liters: 'L',
      mil: 'mL',
      ml: 'mL',
      milliliter: 'mL',
      milliliters: 'mL',
      cubicmeter: 'm^3',
      cubicmeters: 'm^3',
      cubicm: 'm^3',
      cc: 'cm^3',
      cubiccentimeter: 'cm^3',
      cubiccentimeters: 'cm^3',
      cubiccm: 'cm^3',
      gallon: 'gal',
      gallons: 'gal',
      quart: 'qt',
      quarts: 'qt',
      pint: 'pt',
      pints: 'pt',
      cup: 'c',
      cups: 'c',
      fluidounce: 'floz',
      fluidounces: 'floz',
      fl_oz: 'floz',
      teaspoon: 'tsp',
      teaspoons: 'tsp',
      tablespoon: 'Tbsp',
      tablespoons: 'Tbsp',
      butter: 'stick_of_butter',
      butterstick: 'stick_of_butter',
      buttersticks: 'stick_of_butter',
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
      solar_mass: { suffix: ' solar masses', ...factor(1.989e+30) },

      kgs: 'kg',
      kilogram: 'kg',
      kilograms: 'kg',
      gram: 'g',
      grams: 'g',
      tons: 'ton',
      tonne: 'metric_ton',
      lb: 'lbs',
      pound: 'lbs',
      pounds: 'lbs',
      ozs: 'oz',
      ounce: 'oz',
      ounces: 'oz',
      carat: 'ct',
      carats: 'ct',
      Jupiters: 'Jupiter',
      sun_mass: 'solar_mass'
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
      },

      squaremeter: 'm^2',
      squaremeters: 'm^2',
      sqmeter: 'm^2',
      squarem: 'm^2',
      squarecentimeter: 'cm^2',
      squarecentimeters: 'cm^2',
      sqcm: 'cm^2',
      squarecm: 'cm^2',
      squarefoot: 'ft^2',
      squarefeet: 'ft^2',
      sqft: 'ft^2',
      squareft: 'ft^2',
      squareinch: 'in^2',
      squareinches: 'in^2',
      sqin: 'in^2',
      squarein: 'in^2',
      acres: 'acre',
      squaregabo: 'gabo^2',
      squaregabos: 'gabo^2',
      sqgabo: 'gabo^2'
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
      },

      y: 'years',
      yr: 'years',
      yrs: 'years',
      year: 'years',
      w: 'weeks',
      wk: 'weeks',
      wks: 'weeks',
      week: 'weeks',
      d: 'days',
      dy: 'days',
      day: 'days',
      h: 'hours',
      hr: 'hours',
      hrs: 'hours',
      hour: 'hours',
      m: 'minutes',
      min: 'minutes',
      mins: 'minutes',
      minute: 'minutes',
      s: 'seconds',
      sec: 'seconds',
      secs: 'seconds',
      second: 'seconds',
      sols: 'sol',
      time: 'format_time',
      f_t: 'format_time'
    }
  };
})();