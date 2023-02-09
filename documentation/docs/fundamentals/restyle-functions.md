---
id: restyle-functions
title: Restyle functions
---

Restyle functions are the bread and butter of Restyle. They specify how props should be mapped to values in a resulting style object, that can then be passed down to a React Native component. The props support responsive values and can be mapped to values in your theme.

## Predefined Restyle functions

The Restyle library comes with a number of predefined Restyle functions for your convenience. Properties within brackets are aliases / shorthands for the preceding prop name.

| Restyle Function | Props                                                                                                                                                                                                                                                                                                                                                                        | Theme Key   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| backgroundColor  | backgroundColor [bg]                                                                                                                                                                                                                                                                                                                                                         | colors      |
| color            | color                                                                                                                                                                                                                                                                                                                                                                        | colors      |
| opacity          | opacity                                                                                                                                                                                                                                                                                                                                                                      | _none_      |
| pointerEvents    | pointerEvents                                                                                                                                                                                                                                                                                                                                                                | _none_      |
| visible          | display (maps `true` / `false` to `flex` / `none`)                                                                                                                                                                                                                                                                                                                           | _none_      |
| spacing          | margin [m], marginTop [mt], marginRight [mr], marginBottom [mb], marginLeft [ml], marginStart [ms], marginEnd[me], marginHorizontal [mx], marginVertical [my], padding [p], paddingTop [pt], paddingRight [pr], paddingBottom [pb], paddingLeft [pl], paddingStart [ps], paddingEnd [pe], paddingHorizontal [px], paddingVertical [py], gap [g], rowGap [rG], columnGap [cG] | spacing     |
| layout           | width, height, minWidth, maxWidth, minHeight, maxHeight, overflow, aspectRatio, alignContent, alignItems, alignSelf, justifyContent, flex, flexBasis, flexDirection, flexGrow, flexShrink, flexWrap                                                                                                                                                                          | _none_      |
| position         | position, top, right, bottom, left, start, end                                                                                                                                                                                                                                                                                                                               | _none_      |
| position         | zIndex                                                                                                                                                                                                                                                                                                                                                                       | zIndices    |
| border           | borderBottomWidth, borderLeftWidth, borderRightWidth, borderStartWidth, borderEndWidth, borderStyle, borderTopWidth, borderWidth, borderCurve                                                                                                                                                                                                                                | _none_      |
| border           | borderColor, borderTopColor, borderRightColor, borderLeftColor, borderStartColor, borderEndColor, borderBottomColor                                                                                                                                                                                                                                                          | colors      |
| border           | borderRadius, borderBottomLeftRadius, borderBottomRightRadius, borderBottomStartRadius, borderBottomEndRadius, borderTopLeftRadius, borderTopRightRadius, borderTopStartRadius, borderTopEndRadius                                                                                                                                                                           | borderRadii |
| shadow           | shadowOpacity, shadowOffset, shadowRadius, elevation                                                                                                                                                                                                                                                                                                                         | _none_      |
| shadow           | shadowColor                                                                                                                                                                                                                                                                                                                                                                  | colors      |
| textShadow       | textShadowOffset, textShadowRadius                                                                                                                                                                                                                                                                                                                                           | _none_      |
| textShadow       | textShadowColor                                                                                                                                                                                                                                                                                                                                                              | colors      |
| typography       | fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textDecorationLine, textDecorationStyle, textTransform                                                                                                                                                                                                                                    | _none_      |

## Custom Restyle functions

To define your own Restyle function, use the `createRestyleFunction` helper:

```ts
import {createRestyleFunction, createRestyleComponent} from '@shopify/restyle'
const transparency = createRestyleFunction({
  property: 'transparency',
  styleProperty: 'opacity',
  transform: ({value}: {value: number}) => 1 - value,
});

const TransparentComponent = createRestyleComponent([transparency])

<TransparentComponent transparency={0.5} />
```

Arguments:

- `property`: The name of the component prop that the function will receive the value of.
- `styleProperty`: The name of the property in the style object to map to. Defaults to the value of `property`.
- `transform({value, theme, themeKey})`: An optional function that transforms the value of the prop to the value that will be inserted into the style object.
- `themeKey`: An optional key in the theme to map values from, e.g. `colors`.
