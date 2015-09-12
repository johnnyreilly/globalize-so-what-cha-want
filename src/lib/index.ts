/* jshint varstmt: false, esnext: false */
var DEPENDENCY_TYPES = {
  SHARED_JSON: 'Shared JSON (used by all locales)',
  LOCALE_JSON: 'Locale specific JSON (supplied for each locale)'
};

interface ModuleDependency {
  dependsUpon: string[];
  cldrGlobalizeFiles: string[];
  json: {
    dependencyType: string;
    dependency: string;
  }[]
}

var moduleDependencies: { [key: string]: ModuleDependency } = {
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

interface DependencyPopulator {
  (module: string, requireds: string[]) : string[]
}

function determineRequired(globalizeOptions: Options, populateDependencies: DependencyPopulator) {
  var modules = Object.keys(globalizeOptions);
  modules.forEach(function(module) {
    if (!moduleDependencies[module]) {
      throw new TypeError('There is no \'' + module + '\' module');
    }
  });

  var requireds: string[] = [];
  modules.forEach(function (module) {
    if (globalizeOptions[module]) {
      populateDependencies(module, requireds);
    }
  });

  return requireds;
}

function _populateDependencyCurrier(
    requiredArray: string,
    requiredArrayGetter: (prop: any) => string
  ): DependencyPopulator  {
  var popDepFn = function(module: string, requireds: string[]) {
    var dependencies = moduleDependencies[module];

    dependencies.dependsUpon.forEach(function(requiredModule) {
      popDepFn(requiredModule, requireds);
    });

    dependencies[requiredArray].forEach(function(required: any) {
      var newRequired = requiredArrayGetter(required);
      if (requireds.indexOf(newRequired) === -1) {
        requireds.push(newRequired);
      }
    });

    return requireds;
  };

  return popDepFn;
}

export interface Options {
  currency: boolean;
  date: boolean;
  message: boolean;
  number: boolean;
  plural: boolean;
  relativeTime: boolean;
}

/**
 * The string array returned will contain a list of the required cldr json data you need. I don't believe ordering matters for the json but it is listed in the same dependency order as the cldr / globalize files are.
 *
 * @param options The globalize modules being used.
 */
export function determineRequiredCldrData(globalizeOptions: Options) {
  return determineRequired(globalizeOptions, _populateDependencyCurrier('json', function(json) { return json.dependency; }));
}

/**
 * The string array returned will contain a list of the required cldr / globalize files you need, listed in the order they are required.
 *
 * @param options The globalize modules being used.
 */
export function determineRequiredCldrGlobalizeFiles(globalizeOptions: Options) {
  return determineRequired(globalizeOptions, _populateDependencyCurrier('cldrGlobalizeFiles', function(cldrGlobalizeFile) { return cldrGlobalizeFile; }));
}
