---
id: fontSizes
title: Font Sizes
---

When working with font sizes in a design system, a common pattern is to define a scale that includes a range of sizes, from smaller to larger text. See for example the [Type Scale Tool](https://typescale.com/).

This scale should preferably not be directly included as values in the theme. Instead, the naming of font sizes in the theme object should be used to assign semantic meaning to the scale, as shown in this example:

```ts
const theme = createTheme({
  fontSizes: {
    title: 34,
    h1: 28,
    h2: 22,
    h3: 20,
    body: 16,
  },
});
```

Defining semantic font sizes brings several advantages:

- It’s clear which font sizes are used and in what contexts throughout the app.
- If changes are made to the font scale (e.g., adjusting the base size or ratios), you only need to update the semantic size mappings instead of manually changing every reference to specific sizes like `body` across the app.
- Themes can easily be swapped at runtime, enabling dynamic adjustments like switching to a larger font scale for accessibility.
