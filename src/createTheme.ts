import {BaseTheme} from './types';

type BaseThemeWithBorderColors = Omit<BaseTheme, 'borderColors'> &
  Required<Pick<BaseTheme, 'borderColors'>>;

// Enforces proper shape for theme without throwing away the user specific values
const createTheme = <T extends BaseTheme | BaseThemeWithBorderColors>(
  themeObject: T,
): T & {
  borderColors: T extends BaseThemeWithBorderColors
    ? T['borderColors']
    : T['colors'];
} => {
  if ('borderColors' in themeObject) {
    // return themeObject;
    return {
      ...themeObject,
      borderColors: {
        ...themeObject.borderColors,
      },
    } as T & {
      borderColors: T extends BaseThemeWithBorderColors
        ? T['borderColors']
        : T['colors'];
    };
  } else {
    return {
      ...themeObject,
      borderColors: {
        ...themeObject.colors,
      },
    } as T & {
      borderColors: T extends BaseThemeWithBorderColors
        ? T['borderColors']
        : T['colors'];
    };
  }
};

export default createTheme;
