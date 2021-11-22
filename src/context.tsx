import React from 'react';
import {BaseTheme} from 'types';

import {DimensionsProvider} from './hooks/useDimensions';

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
}) => (
  <ThemeContext.Provider value={theme}>
    <DimensionsProvider>{children}</DimensionsProvider>
  </ThemeContext.Provider>
);
