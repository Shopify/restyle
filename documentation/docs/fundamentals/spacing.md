---
id: spacing
title: Spacing
---

Spacing tends to follow multiples of a given base spacing number, for example `8`. We prefer using the t-shirt size naming convention, because of the scalability of it (any number of `x`'s can be prepended for smaller and larger sizes):

```ts
const theme = createTheme({
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
});
```
