import {StyleSheet} from 'react-native';
import {BaseTheme, CreateStyleFn, RNStyleSheetType} from 'types';

import useTheme from './hooks/useTheme';

function styleCreator<U extends BaseTheme, T extends RNStyleSheetType<T>>(
  stylesOrCreator: CreateStyleFn<T, U>,
) {
  return (appTheme: U) =>
    typeof stylesOrCreator === 'function'
      ? StyleSheet.create(stylesOrCreator(appTheme))
      : StyleSheet.create(stylesOrCreator);
}

function makeStyles<U extends BaseTheme, T extends RNStyleSheetType<T>>(
  stylesOrCreator: CreateStyleFn<T, U>,
) {
  const useStyles = () => {
    const appTheme = useTheme() as U;
    return styleCreator(stylesOrCreator)(appTheme);
  };
  return useStyles;
}

export default makeStyles;
