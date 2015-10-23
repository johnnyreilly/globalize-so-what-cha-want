import { determineRequiredCldrData, determineRequiredCldrGlobalizeFiles } from '../../src/lib/index';

const globalizeOptionsAll = {
  currency     : true,
  date         : true,
  message      : true,
  number       : true,
  plural       : true,
  relativeTime : true,
  unit         : true
};

const globalizeOptionsDateNumber = {
  date         : true,
  number       : true
};

describe('determineRequiredCldrData', () => {
  it('should return all JSON requiredments', () => {
    const requiredCldrData = determineRequiredCldrData(globalizeOptionsAll);
    expect(requiredCldrData).toEqual([
      'cldr/supplemental/likelySubtags.json',
      'cldr/main/{locale}/numbers.json',
      'cldr/supplemental/numberingSystems.json',
      'cldr/supplemental/plurals.json',
      'cldr/supplemental/ordinals.json',
      'cldr/main/{locale}/currencies.json',
      'cldr/supplemental/currencyData.json',
      'cldr/main/{locale}/ca-gregorian.json',
      'cldr/main/{locale}/timeZoneNames.json',
      'cldr/supplemental/timeData.json',
      'cldr/supplemental/weekData.json',
      'cldr/main/{locale}/dateFields.json',
      'cldr/main/{locale}/unit.json'
    ]);
  });

  it('should return date and number JSON requiredments', () => {
    const requiredCldrData = determineRequiredCldrData(globalizeOptionsDateNumber);
    expect(requiredCldrData).toEqual([
      'cldr/supplemental/likelySubtags.json',
      'cldr/main/{locale}/numbers.json',
      'cldr/supplemental/numberingSystems.json',
      'cldr/main/{locale}/ca-gregorian.json',
      'cldr/main/{locale}/timeZoneNames.json',
      'cldr/supplemental/timeData.json',
      'cldr/supplemental/weekData.json'
    ]);
  });
});

describe('determineRequiredCldrGlobalizeFiles', () => {
  it('should return all cldr / globalize files', () => {
    const requiredCldrGlobalizeFiles = determineRequiredCldrGlobalizeFiles(globalizeOptionsAll);
    expect(requiredCldrGlobalizeFiles).toEqual([
      'cldr.js',
      'cldr/event.js',
      'cldr/supplemental.js',
      'globalize.js',
      'globalize/number.js',
      'globalize/plural.js',
      'globalize/currency.js',
      'globalize/date.js',
      'globalize/message.js',
      'globalize/relative-time.js',
      'globalize/unit.js'
    ]);
  });

  it('should return date and number of cldr / globalize files', () => {
    const requiredCldrGlobalizeFiles = determineRequiredCldrGlobalizeFiles(globalizeOptionsDateNumber);
    expect(requiredCldrGlobalizeFiles).toEqual([
      'cldr.js',
      'cldr/event.js',
      'cldr/supplemental.js',
      'globalize.js',
      'globalize/number.js',
      'globalize/date.js'
    ]);
  });
});
