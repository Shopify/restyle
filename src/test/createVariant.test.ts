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
  boxVariants: {
    defaults: {
      fontSize: {
        phone: 12,
        tablet: 24,
      },
      backgroundColor: {
        phone: 'black',
        tablet: 'white',
      },
    },
    primary: {
      width: 50,
      height: 50,
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

  it('accepts defaults', () => {
    const variant = createVariant({
      themeKey: 'textVariants',
      defaults: {
        fontSize: 10,
        opacity: 0.5,
      },
    });
    expect(variant.func({}, {theme, dimensions})).toStrictEqual({
      fontSize: 10,
      opacity: 0.5,
    });
  });

  it('accepts defaults from the theme', () => {
    const variant = createVariant({
      themeKey: 'boxVariants',
    });
    expect(variant.func({}, {theme, dimensions})).toStrictEqual({
      fontSize: 12,
      backgroundColor: '#111111',
    });
  });

  it('accepts defaults from the theme and correctly overrides variant defaults', () => {
    const variant = createVariant({
      themeKey: 'boxVariants',
      defaults: {
        fontSize: 10,
        opacity: 0.5,
      },
    });

    expect(variant.func({}, {theme, dimensions})).toStrictEqual({
      backgroundColor: '#111111',
      fontSize: 12,
      opacity: 0.5,
    });
  });

  it('correctly uses the breakpoints for defaults within the theme', () => {
    const variant = createVariant({
      themeKey: 'boxVariants',
      defaults: {
        fontSize: 10,
        opacity: 0.5,
      },
    });

    expect(variant.func({}, {theme, dimensions})).toStrictEqual({
      backgroundColor: '#111111',
      fontSize: 12,
      opacity: 0.5,
    });

    expect(
      variant.func(
        {},
        {
          theme,
          dimensions: {
            width: 376,
            height: 667,
          },
        },
      ),
    ).toStrictEqual({
      backgroundColor: '#EEEEEE',
      fontSize: 24,
      opacity: 0.5,
    });
  });

  it('correctly overrides default values', () => {
    const variant = createVariant({
      themeKey: 'textVariants',
      defaults: {
        fontSize: 10,
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
