import {useContext} from 'react';
import {BaseTheme} from 'types';

import {ThemeContext} from '../context';

const useTheme = <Theme extends BaseTheme = BaseTheme>() =>
  useContext(ThemeContext) as Theme;

export default useTheme;
