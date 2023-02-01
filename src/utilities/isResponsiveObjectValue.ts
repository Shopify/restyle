import {
  AtLeastOneResponsiveValue,
  ResponsiveBaseTheme,
  ResponsiveValue,
} from '../types';
import {getKeys} from '../typeHelpers';

export const isResponsiveObjectValue = <
  Theme extends ResponsiveBaseTheme,
  TVal,
>(
  val: ResponsiveValue<TVal, Theme['breakpoints']>,
  theme: Theme,
): val is AtLeastOneResponsiveValue<TVal, Theme['breakpoints']> => {
  if (!val) return false;
  if (typeof val !== 'object') return false;
  return getKeys(val).every(
    key => theme.breakpoints[key as string] !== undefined,
  );
};
