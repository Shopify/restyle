import {useContext} from 'react';
import {ThemeContext} from '../context';

const useTheme = () => useContext(ThemeContext);
export default useTheme;
