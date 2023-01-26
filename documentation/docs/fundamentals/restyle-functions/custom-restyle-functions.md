---
id: custom-restyle-functions
title: Custom Restyle functions
---

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
