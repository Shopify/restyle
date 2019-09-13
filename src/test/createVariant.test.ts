import createVariant from '../createVariant';

const theme = {
  colors: {
    black: '#111111',
    white: '#EEEEEE',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
  breakpoints: {
    phone: 0,
    tablet: 376,
  },
  textVariants: {
    body: {
      fontSize: 14,
      lineHeight: 18,
    },
    subheader: {
      fontSize: 16,
      color: 'black',
    },
    header: {
      margin: 's',
      fontSize: {
        phone: 22,
        tablet: 28,
      },
      fontWeight: 'bold',
      color: 'white',
    },
  },
};
const dimensions = {
  width: 375,
  height: 667,
};

describe('createVariant', () => {
  it('expands a variant to the given values in the theme', () => {
    const variant = createVariant({themeKey: 'textVariants'});
    expect(variant.func({variant: 'body'}, {theme, dimensions})).toStrictEqual({
      fontSize: 14,
      lineHeight: 18,
    });
  });

  it('accepts default values', () => {
    const variant = createVariant({
      themeKey: 'textVariants',
      defaults: {
        opacity: 0.5,
      },
    });
    expect(variant.func({variant: 'body'}, {theme, dimensions})).toStrictEqual({
      fontSize: 14,
      lineHeight: 18,
      opacity: 0.5,
    });
  });

  it('supports referencing other theme values in the variant', () => {
    const variant = createVariant({themeKey: 'textVariants'});
    expect(
      variant.func({variant: 'subheader'}, {theme, dimensions}),
    ).toStrictEqual({
      fontSize: 16,
      color: '#111111',
    });
  });

  it('supports responsive values', () => {
    const variant = createVariant({themeKey: 'textVariants'});
    expect(
      variant.func(
        {variant: 'header'},
        {theme, dimensions: {width: 768, height: 1024}},
      ),
    ).toStrictEqual({
      fontSize: 28,
      margin: 8,
      fontWeight: 'bold',
      color: '#EEEEEE',
    });
  });
});
