import createRestyleFunction from '../createRestyleFunction';
import {RNStyle} from '../types';

const theme = {
  colors: {
    primary: '#FFB6C1',
  },
  spacing: {},
  borderRadii: {
    s: 4,
    m: 8,
  },
  opacities: {
    invisible: 0,
    barelyVisible: 0.1,
    almostOpaque: 0.9,
  },
  breakpoints: {
    phone: 0,
    tablet: 376,
  },
};
const dimensions = {
  width: 375,
  height: 667,
};

describe('createRestyleFunction', () => {
  describe('creates a function that', () => {
    it('accepts props and returns a style object', () => {
      const styleFunc = createRestyleFunction({property: 'opacity'});
      expect(styleFunc.func({opacity: 0.5}, {theme, dimensions})).toStrictEqual(
        {
          opacity: 0.5,
        },
      );
    });

    it('allows configuring the style object output key', () => {
      const styleFunc = createRestyleFunction({
        property: 'opacity',
        styleProperty: 'testOpacity' as keyof RNStyle,
      });
      expect(styleFunc.func({opacity: 0.5}, {theme, dimensions})).toStrictEqual(
        {
          testOpacity: 0.5,
        },
      );
    });

    it('allows transforming the value', () => {
      const styleFunc = createRestyleFunction({
        property: 'transparency',
        styleProperty: 'opacity',
        transform: ({value}: {value: number}) => 1 - value,
      });
      expect(
        styleFunc.func({transparency: 0.1}, {theme, dimensions}),
      ).toStrictEqual({
        opacity: 0.9,
      });
    });

    it('accepts screen-size specific props', () => {
      const styleFunc = createRestyleFunction({property: 'opacity'});

      expect(
        styleFunc.func(
          {
            opacity: {
              phone: 0.5,
              tablet: 0.8,
            },
          },
          {theme, dimensions},
        ),
      ).toStrictEqual({
        opacity: 0.5,
      });

      expect(
        styleFunc.func(
          {
            opacity: {
              phone: 0.5,
              tablet: 0.8,
            },
          },
          {theme, dimensions: {width: 768, height: 1024}},
        ),
      ).toStrictEqual({
        opacity: 0.8,
      });
    });

    describe('with themeKey', () => {
      const styleFunc = createRestyleFunction({
        property: 'opacity',
        themeKey: 'opacities',
      });

      it('creates a function that picks values from the theme', () => {
        expect(
          styleFunc.func({opacity: 'barelyVisible'}, {theme, dimensions}),
        ).toStrictEqual({
          opacity: 0.1,
        });
      });

      it('supports screen-size specific props', () => {
        expect(
          styleFunc.func(
            {
              opacity: {
                tablet: 'barelyVisible',
              },
            },
            {theme, dimensions: {width: 768, height: 1024}},
          ),
        ).toStrictEqual({
          opacity: 0.1,
        });
      });

      it('throws an error when trying to use an invalid theme value', () => {
        expect(() =>
          styleFunc.func({opacity: 'veryVisible'}, {theme, dimensions}),
        ).toThrow(/does not exist/);
      });

      it('allows 0 as a theme value', () => {
        expect(() =>
          styleFunc.func({opacity: 'invisible'}, {theme, dimensions}),
        ).not.toThrow(/does not exist/);
      });
    });

    describe('with a numeric theme scale', () => {
      const styleFunc = createRestyleFunction({
        property: 'borderRadius',
        themeKey: 'borderRadii',
      });

      it('picks values from the theme', () => {
        expect(
          styleFunc.func({borderRadius: 'm'}, {theme, dimensions}),
        ).toStrictEqual({
          borderRadius: 8,
        });
      });

      it('passes a raw numeric value through when it is not a theme key', () => {
        // react-native-reanimated 4.4+ re-renders settled animations with the
        // resolved raw values set as top-level props, e.g. borderRadius={13}
        expect(
          styleFunc.func({borderRadius: 13}, {theme, dimensions}),
        ).toStrictEqual({
          borderRadius: 13,
        });
      });

      it('passes a raw numeric value through for screen-size specific props', () => {
        expect(
          styleFunc.func({borderRadius: {phone: 13}}, {theme, dimensions}),
        ).toStrictEqual({
          borderRadius: 13,
        });
      });

      it('throws an error when trying to use an invalid string theme value', () => {
        expect(() =>
          styleFunc.func({borderRadius: 'xxl'}, {theme, dimensions}),
        ).toThrow(/does not exist/);
      });
    });

    describe('with the colors theme scale', () => {
      const styleFunc = createRestyleFunction({
        property: 'backgroundColor',
        themeKey: 'colors',
      });

      it('passes a raw rgba color string through when it is not a theme key', () => {
        expect(
          styleFunc.func(
            {backgroundColor: 'rgba(255, 209, 102, 1)'},
            {theme, dimensions},
          ),
        ).toStrictEqual({
          backgroundColor: 'rgba(255, 209, 102, 1)',
        });
      });

      it('passes a raw hex color string through when it is not a theme key', () => {
        expect(
          styleFunc.func({backgroundColor: '#FFE6E4'}, {theme, dimensions}),
        ).toStrictEqual({
          backgroundColor: '#FFE6E4',
        });
      });

      it('throws an error when trying to use a misspelled theme color', () => {
        expect(() =>
          styleFunc.func({backgroundColor: 'primaryy'}, {theme, dimensions}),
        ).toThrow(/does not exist/);
      });
    });
  });
});
