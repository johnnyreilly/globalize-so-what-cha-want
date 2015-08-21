# Globalize So What'cha Want

Tell me what Globalize modules you want to use, I'll tell you what you need.

## Usage

```
var globalizeOptions = {
  currency: true,
  date: true,
  message: true,
  number: true,
  plural: true,
  relativeTime: true
};

var requiredCldrGlobalizeFiles = soWhatchaWant.determineRequiredCldrGlobalizeFiles(globalizeOptions);

// [ 'cldr.js',
//   'cldr/event.js',
//   'cldr/supplemental.js',
//   'globalize.js',
//   'globalize/currency.js',
//   'globalize/date.js',
//   'globalize/message.js',
//   'globalize/number.js',
//   'globalize/plural.js',
//   'globalize/relative-time.js' ]
  
var requiredCldrData = soWhatchaWant.determineRequiredCldrData(globalizeOptions);

// [ 'cldr/main/{locale}/currencies.json',
//   'cldr/supplemental/currencyData.json',
//   'cldr/main/{locale}/numbers.json',
//   'cldr/supplemental/numberingSystems.json',
//   'cldr/supplemental/likelySubtags.json',
//   'cldr/supplemental/plurals.json',
//   'cldr/supplemental/ordinals.json',
//   'cldr/main/{locale}/ca-gregorian.json',
//   'cldr/main/{locale}/timeZoneNames.json',
//   'cldr/supplemental/timeData.json',
//   'cldr/supplemental/weekData.json',
//   'cldr/main/{locale}/dateFields.json' ]
  
```
