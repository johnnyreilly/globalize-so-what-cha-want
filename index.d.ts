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
export declare function determineRequiredCldrData(globalizeOptions: Options): string[];
/**
 * The string array returned will contain a list of the required cldr / globalize files you need, listed in the order they are required.
 *
 * @param options The globalize modules being used.
 */
export declare function determineRequiredCldrGlobalizeFiles(globalizeOptions: Options): string[];
