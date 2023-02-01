---
id: breakpoints
title: Breakpoints
---

Breakpoints are defined as minimum widths (inclusive) for different target screen sizes where we want to apply differing styles. Consider giving your breakpoints names that give a general idea of the type of device the user is using. Breakpoints can be defined by either a single value (width) or an object containing both width and height:

```ts
const theme = createTheme({
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
});
```

See the [Responsive Values](/fundamentals/responsive-values) section to see how these can be used. Defining `breakpoints` is optional and we recommend defining it only if you plan to use them due to a performance hit (up to 10 % worse average FPS when scrolling in a list) responsive values incur.
