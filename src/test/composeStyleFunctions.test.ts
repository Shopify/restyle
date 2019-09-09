import createStyleFunction from '../createStyleFunction';
import composeStyleFunctions from '../composeStyleFunctions';

const theme = {
  colors: {
    black: '#111111',
  },
  spacing: {
    m: 16,
  },
  breakpoints: {},
};

const dimensions = {
  width: 375,
  height: 667,
};

describe('composeStyleFunctions', () => {
  const styleFunctions = [
    createStyleFunction({property: 'color', themeKey: 'colors'}),
    createStyleFunction({property: 'margin', themeKey: 'spacing'}),
  ];

  it('composes multiple styleFunctions into one', () => {
    const {buildStyle} = composeStyleFunctions(styleFunctions);
    expect(
      buildStyle({color: 'black', margin: 'm'}, {theme, dimensions}),
    ).toStrictEqual({
      color: '#111111',
      margin: 16,
    });
  });

  it('combines all style function input properties into a list', () => {
    const {properties} = composeStyleFunctions(styleFunctions);
    expect(properties).toStrictEqual(['color', 'margin']);
  });
});
