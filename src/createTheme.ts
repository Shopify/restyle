import {BaseTheme} from './types';

// Enforces proper shape for theme without throwing away the user specific values
const createTheme = <T extends BaseTheme>(themeObject: T): T => themeObject;

export default createTheme;
