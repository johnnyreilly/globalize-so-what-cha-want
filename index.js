/* jshint varstmt: false, esnext: false */
var DEPENDENCY_TYPES = {
  SHARED_JSON: 'Shared JSON (used by all locales)',
  LOCALE_JSON: 'Locale specific JSON (supplied for each locale)'
};

var moduleDependencies = {
  'core': {
    dependsUpon: [],
    cldrGlobalizeFiles: ['cldr.js', 'cldr/event.js', 'cldr/supplemental.js', 'globalize.js'],
    json: [
      { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/likelySubtags.json' }
    ]
  },

  'currency': {
    dependsUpon: ['number','plural'],
    cldrGlobalizeFiles: ['globalize/currency.js'],
    json: [
      { dependencyType: DEPENDENCY_TYPES.LOCALE_JSON, dependency: 'cldr/main/{locale}/currencies.json' },
      { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/currencyData.json' }
    ]
  },

  'date': {
    dependsUpon: ['number'],
    cldrGlobalizeFiles: ['globalize/date.js'],
    json: [
      { dependencyType: DEPENDENCY_TYPES.LOCALE_JSON, dependency: 'cldr/main/{locale}/ca-gregorian.json' },
      { dependencyType: DEPENDENCY_TYPES.LOCALE_JSON, dependency: 'cldr/main/{locale}/timeZoneNames.json' },
      { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/timeData.json' },
      { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/weekData.json' }
    ]
  },

  'message': {
    dependsUpon: ['core'],
    cldrGlobalizeFiles: ['globalize/message.js'],
    json: []
  },

  'number': {
    dependsUpon: ['core'],
    cldrGlobalizeFiles: ['globalize/number.js'],
    json: [
      { dependencyType: DEPENDENCY_TYPES.LOCALE_JSON, dependency: 'cldr/main/{locale}/numbers.json' },
      { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/numberingSystems.json' }
    ]
  },

  'plural': {
    dependsUpon: ['core'],
    cldrGlobalizeFiles: ['globalize/plural.js'],
    json: [
      { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/plurals.json' },
      { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/ordinals.json' }
    ]
  },

  'relativeTime': {
    dependsUpon: ['number','plural'],
    cldrGlobalizeFiles: ['globalize/relative-time.js'],
    json: [
      { dependencyType: DEPENDENCY_TYPES.LOCALE_JSON, dependency: 'cldr/main/{locale}/dateFields.json' }
    ]
  }
};

function determineRequiredCldrData(globalizeOptions) {
  return determineRequired(globalizeOptions, 'json', function(json) { return json.dependency; });
}

function determineRequiredCldrGlobalizeFiles(globalizeOptions) {
  return determineRequired(globalizeOptions, 'cldrGlobalizeFiles', function(cldrGlobalizeFile) { return cldrGlobalizeFile; });
}

function determineRequired(globalizeOptions, requiredArray, requiredArrayGetter) {
  var modules = Object.keys(globalizeOptions);
  modules.forEach(function(module) {
    if (!moduleDependencies[module]) {
      throw new TypeError('There is no \'' + module + '\' module');
    }
  });

  var requireds = [];
  modules.forEach(function (module) {
    if (globalizeOptions[module]) {
      _populateDependencies(module, requireds, requiredArray, requiredArrayGetter);
    }
  });

  return requireds;
}

function _populateDependencies(module, requireds, requiredArray, requiredArrayGetter) {
  var dependencies = moduleDependencies[module];

  dependencies.dependsUpon.forEach(function(requiredModule) {
    _populateDependencies(requiredModule, requireds, requiredArray, requiredArrayGetter);
  });

  dependencies[requiredArray].forEach(function(required) {
    var newRequired = requiredArrayGetter(required);
    if (requireds.indexOf(newRequired) === -1) {
      requireds.push(newRequired);
    }
  });

  return requireds;
}
/*
function determineRequiredCldrGlobalizeFiles(globalizeOptions){
  var requiredFiles = ['cldr.js', 'cldr/event.js', 'cldr/supplemental.js', 'globalize.js'];
  if (globalizeOptions.currency)     { requiredFiles.push('globalize/currency.js'); }
  if (globalizeOptions.date)         { requiredFiles.push('globalize/date.js'); }
  if (globalizeOptions.message)      { requiredFiles.push('globalize/message.js'); }
  if (globalizeOptions.number)       { requiredFiles.push('globalize/number.js'); }
  if (globalizeOptions.plural)       { requiredFiles.push('globalize/plural.js'); }
  if (globalizeOptions.relativeTime) { requiredFiles.push('globalize/relative-time.js'); }

  return requiredFiles;
}
*/
module.exports = {
  determineRequiredCldrData: determineRequiredCldrData,
  determineRequiredCldrGlobalizeFiles: determineRequiredCldrGlobalizeFiles
};
