import {
  AtLeastOneResponsiveValue,
  Breakpoint,
  Dimensions,
  ResponsiveBaseTheme,
} from '../types';

/**
 * Returns actual value for given `responsiveValue`, `breakpoints`, and current `dimensions`.
 */
export const getValueForScreenSize = <Theme extends ResponsiveBaseTheme, TVal>({
  responsiveValue,
  breakpoints,
  dimensions,
}: {
  responsiveValue: AtLeastOneResponsiveValue<TVal, Theme['breakpoints']>;
  breakpoints: Theme['breakpoints'];
  dimensions: Dimensions;
}): TVal | undefined => {
  const sortedBreakpoints = Object.entries(breakpoints).sort((valA, valB) => {
    const valAWidth = getWidth(valA[1]);
    const valBWidth = getWidth(valB[1]);

    return valAWidth - valBWidth;
  });

  const {width, height} = dimensions;
  return sortedBreakpoints.reduce<TVal | undefined>((acc, [key, value]) => {
    if (typeof value === 'object') {
      if (
        width >= value.width &&
        height >= value.height &&
        responsiveValue[key] !== undefined
      ) {
        return responsiveValue[key] as TVal;
      }
    } else if (width >= value && responsiveValue[key] !== undefined) {
      return responsiveValue[key] as TVal;
    }

    return acc;
  }, undefined);
};

function getWidth(value: Breakpoint) {
  if (typeof value === 'object') {
    return value.width;
  }

  return value;
}
