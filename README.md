# Globalize So What'cha Want

[![Build Status](https://ci.appveyor.com/api/projects/status/github/johnnyreilly/globalize-so-what-cha-want?retina=false)](https://ci.appveyor.com/project/JohnReilly/globalize-so-what-cha-want)
[![NPM version](https://img.shields.io/npm/v/globalize-so-what-cha-want.svg)](https://www.npmjs.com/package/globalize-so-what-cha-want)

Tell me what Globalize modules you want to use, I'll tell you what you need and in the order you need it.

## Usage

Globalize So What'cha Want exposes 2 methods; `determineRequiredCldrGlobalizeFiles` and `determineRequiredCldrData`.

#### `determineRequiredCldrGlobalizeFiles( options ) => string[]`

The string array returned will contain a list of the required cldr / globalize files you need, listed in the order they are required.

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
//   'globalize/number.js',
//   'globalize/plural.js',
//   'globalize/currency.js',
//   'globalize/date.js',
//   'globalize/message.js',
//   'globalize/relative-time.js']
```

#### `determineRequiredCldrData( options ) => string[]`

The string array returned will contain a list of the required cldr json data you need.  I don't believe ordering matters for the json but it is listed in the same dependency order as the cldr / globalize files are.

```
var globalizeOptions = {
  currency: true,
  date: true,
  message: true,
  number: true,
  plural: true,
  relativeTime: true
};

var requiredCldrData = soWhatchaWant.determineRequiredCldrData(globalizeOptions);

// [ 'cldr/supplemental/likelySubtags.json',
//   'cldr/main/{locale}/numbers.json',
//   'cldr/supplemental/numberingSystems.json',
//   'cldr/supplemental/plurals.json',
//   'cldr/supplemental/ordinals.json',
//   'cldr/main/{locale}/currencies.json',
//   'cldr/supplemental/currencyData.json',
//   'cldr/main/{locale}/ca-gregorian.json',
//   'cldr/main/{locale}/timeZoneNames.json',
//   'cldr/supplemental/timeData.json',
//   'cldr/supplemental/weekData.json',
//   'cldr/main/{locale}/dateFields.json' ]

```

Both of these methods take an object which details which globalize modules you are interested in.  The object looks like this:

```
var globalizeOptionsAll = {
  currency: true,
  date: true,
  message: true,
  number: true,
  plural: true,
  relativeTime: true
};
```

It's not necessary to specify each key and a `boolean` value. If you were only interested in dates then this would be fine:

```
var globalizeOptionsForDatesOnly = { date: true };
```

### Web Tool

If you don't want to use the package in the raw you can use this [online tool](http://johnnyreilly.github.io/globalize-so-what-cha-want/) which is built on top of the the globalize-so-what-cha-want package.
