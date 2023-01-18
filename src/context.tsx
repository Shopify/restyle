import React from 'react';
import {BaseTheme} from 'types';

export const ThemeContext = React.createContext({
  colors: {},
  spacing: {},
  breakpoints: {},
});

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: BaseTheme;
  children: React.ReactNode;
}) => <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
