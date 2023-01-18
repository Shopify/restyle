import {useWindowDimensions} from 'react-native';

import {BaseTheme, PropValue, ResponsiveValue} from '../types';
import {
  getValueForScreenSize,
  isResponsiveObjectValue,
} from '../responsiveHelpers';

import useTheme from './useTheme';

const useResponsiveProp = <Theme extends BaseTheme, TVal extends PropValue>(
  propValue: ResponsiveValue<TVal, Theme>,
) => {
  const theme = useTheme<Theme>();
  const dimensions = useWindowDimensions();

  return isResponsiveObjectValue(propValue, theme)
    ? getValueForScreenSize({
        responsiveValue: propValue,
        breakpoints: theme.breakpoints,
        dimensions,
      })
    : propValue;
};

export default useResponsiveProp;
