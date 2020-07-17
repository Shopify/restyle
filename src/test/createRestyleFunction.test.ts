import createRestyleFunction from '../createRestyleFunction';
import {RNStyle} from '../types';

const theme = {
  colors: {},
  spacing: {},
  breakpoints: {
    phone: 0,
    tablet: 376,
  },
  opacities: {
    invisible: 0,
    barelyVisible: 0.1,
    almostOpaque: 0.9,
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
  });
});
