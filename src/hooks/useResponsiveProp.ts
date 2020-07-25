import {BaseTheme, PropValue, ResponsiveValue} from '../types';
import {
  getValueForScreenSize,
  isResponsiveObjectValue,
} from '../responsiveHelpers';

import useDimensions from './useDimensions';
import useTheme from './useTheme';

const useResponsiveProp = <Theme extends BaseTheme, TVal extends PropValue>(
  propValue: ResponsiveValue<TVal, Theme>,
) => {
  const theme = useTheme<Theme>();
  const dimensions = useDimensions();

  return isResponsiveObjectValue(propValue, theme)
    ? getValueForScreenSize({
        responsiveValue: propValue,
        breakpoints: theme.breakpoints,
        dimensions,
      })
    : propValue;
};

export default useResponsiveProp;
