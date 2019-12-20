import createRestyleFunction from '../createRestyleFunction';
import composeRestyleFunctions from '../composeRestyleFunctions';

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

describe('composeRestyleFunctions', () => {
  const restyleFunctions = [
    createRestyleFunction({property: 'color', themeKey: 'colors'}),
    createRestyleFunction({property: 'margin', themeKey: 'spacing'}),
  ];

  it('composes multiple restyleFunctions into one', () => {
    const {buildStyle} = composeRestyleFunctions(restyleFunctions);
    expect(
      buildStyle({color: 'black', margin: 'm'}, {theme, dimensions}),
    ).toStrictEqual({
      color: '#111111',
      margin: 16,
    });
  });

  it('combines all restyle function input properties into a list', () => {
    const {properties} = composeRestyleFunctions(restyleFunctions);
    expect(properties).toStrictEqual(['color', 'margin']);
  });
});
