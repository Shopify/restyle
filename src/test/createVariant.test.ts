import createVariant from '../createVariant';
import {BaseTheme} from '../types';

const theme: BaseTheme = {
  colors: {
    black: '#111111',
    white: '#EEEEEE',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
  fontSizes: {
    xs: 12,
    s: 14,
    m: 16,
    l: 20,
    xl: 24,
  },
  breakpoints: {
    phone: 0,
    tablet: 376,
    specific: {
      width: 376,
      height: 400,
    },
  },
  textVariants: {
    body: {
      fontSize: 's',
      lineHeight: 18,
    },
    subheader: {
      fontSize: 'm',
      color: 'black',
    },
    header: {
      margin: 's',
      fontSize: {
        phone: 's',
        tablet: 'm',
        specific: 'l',
      },
      fontWeight: 'bold',
      color: {
        phone: 'black',
        tablet: 'white',
      },
    },
  },
  boxVariants: {
    defaults: {
      fontSize: {
        phone: 'xs',
        tablet: 'xl',
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
        fontSize: 'xs',
        opacity: 0.5,
      },
    });
    expect(variant.func({}, {theme, dimensions})).toStrictEqual({
      fontSize: 12,
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
        fontSize: 'xl',
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
        fontSize: 'xl',
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
        fontSize: 'xl',
        opacity: 0.5,
      },
    });
    expect(variant.func({variant: 'body'}, {theme, dimensions})).toStrictEqual({
      fontSize: 14,
      lineHeight: 18,
      opacity: 0.5,
    });
  });

  it('correctly creates textVariants without key in theme', () => {
    const themeSubset = {...theme};
    delete themeSubset.textVariants;
    const variant = createVariant({themeKey: 'textVariants'});
    expect(variant.func({}, {theme: themeSubset, dimensions})).toStrictEqual(
      {},
    );
  });

  it('correctly creates an unknown variant without key in theme', () => {
    const variant = createVariant({themeKey: '__variant__'});
    expect(variant.func({}, {theme, dimensions})).toStrictEqual({});
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
        {theme, dimensions: {width: 768, height: 300}},
      ),
    ).toStrictEqual({
      fontSize: 16,
      margin: 8,
      fontWeight: 'bold',
      color: '#EEEEEE',
    });
  });

  it('supports more complex responsive values', () => {
    const variant = createVariant({themeKey: 'textVariants'});
    expect(
      variant.func(
        {variant: 'header'},
        {theme, dimensions: {width: 768, height: 1024}},
      ),
    ).toStrictEqual({
      fontSize: 20,
      margin: 8,
      fontWeight: 'bold',
      color: '#EEEEEE',
    });
  });

  it('falls back to the closest width', () => {
    const variant = createVariant({themeKey: 'textVariants'});
    expect(
      variant.func(
        {variant: 'header'},
        {theme, dimensions: {width: 375, height: 1024}},
      ),
    ).toStrictEqual({
      fontSize: 14,
      margin: 8,
      fontWeight: 'bold',
      color: '#111111',
    });
  });
});
