var DEPENDENCY_TYPES = {
  SHARED_JSON: 'Shared JSON (used by all locales)',
  LOCALE_JSON: 'Locale specific JSON (supplied for each locale)',
  MODULE: 'Another modules JSON'
}

var moduleDependencies = {
  'core': [
    { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/likelySubtags.json' }
  ],

  'currency': [
    { dependencyType: DEPENDENCY_TYPES.LOCALE_JSON, dependency: 'cldr/main/{locale}/currencies.json' },
    { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/currencyData.json' },
    { dependencyType: DEPENDENCY_TYPES.MODULE,      dependency: 'number' },
    { dependencyType: DEPENDENCY_TYPES.MODULE,      dependency: 'plural' }
  ],

  'date': [
    { dependencyType: DEPENDENCY_TYPES.LOCALE_JSON, dependency: 'cldr/main/{locale}/ca-gregorian.json' },
    { dependencyType: DEPENDENCY_TYPES.LOCALE_JSON, dependency: 'cldr/main/{locale}/timeZoneNames.json' },
    { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/timeData.json' },
    { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/weekData.json' },
    { dependencyType: DEPENDENCY_TYPES.MODULE,      dependency: 'number' }
  ],

  'message': [
    { dependencyType: DEPENDENCY_TYPES.MODULE,      dependency: 'core' }
  ],

  'number': [
    { dependencyType: DEPENDENCY_TYPES.LOCALE_JSON, dependency: 'cldr/main/{locale}/numbers.json' },
    { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/numberingSystems.json' },
    { dependencyType: DEPENDENCY_TYPES.MODULE,      dependency: 'core' }
  ],

  'plural': [
    { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/plurals.json' },
    { dependencyType: DEPENDENCY_TYPES.SHARED_JSON, dependency: 'cldr/supplemental/ordinals.json' },
    { dependencyType: DEPENDENCY_TYPES.MODULE,      dependency: 'core' }
  ],

  'relativeTime': [
    { dependencyType: DEPENDENCY_TYPES.LOCALE_JSON, dependency: 'cldr/main/{locale}/dateFields.json' },
    { dependencyType: DEPENDENCY_TYPES.MODULE,      dependency: 'number' },
    { dependencyType: DEPENDENCY_TYPES.MODULE,      dependency: 'plural' }
  ]
};

function determineRequiredCldrData(globalizeOptions) {
  var modules = Object.keys(globalizeOptions);
  modules.forEach(function(module) {
    if (!moduleDependencies[module]) {
      throw new TypeError('There is no \'' + module + '\' module');
    }
  });

  var jsonDeps = [];
  modules.forEach(function (module) {
    _populateDependencies(module, jsonDeps);
  });

  return jsonDeps;
}

function _populateDependencies(module, jsonDeps) {
  var dependencies = moduleDependencies[module];
  dependencies.forEach(function(dependency) {
    if (dependency.dependencyType === DEPENDENCY_TYPES.MODULE) {
      _populateDependencies(dependency.dependency, jsonDeps);
    }
    else if (jsonDeps.indexOf(dependency.dependency) === -1) {
      jsonDeps.push(dependency.dependency);
    }
  })
  return jsonDeps;
}

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

module.exports = {
  determineRequiredCldrData: determineRequiredCldrData,
  determineRequiredCldrGlobalizeFiles: determineRequiredCldrGlobalizeFiles
};
