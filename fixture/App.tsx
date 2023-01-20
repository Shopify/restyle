import React from 'react';
import {createBox, ThemeProvider} from '@shopify/restyle';

const theme = {
  colors: {
    myCustomColor: 'red',
  },
  spacing: {},
  buttonVariants: {
    defaults: {},
  },
  breakpoints: {
    phone: 0,
    tablet: 376,
  },
  zIndices: {
    phone: 5,
  },
};

const Box = createBox();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box backgroundColor="myCustomColor" width={200} height={200} />
    </ThemeProvider>
  );
}

export default App;
