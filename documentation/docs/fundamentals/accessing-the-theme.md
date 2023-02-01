---
id: accessing-the-theme
title: Accessing the theme
---

If you need to manually access the theme outside of a component created with Restyle, use the `useTheme` hook:

```tsx
const Component = () => {
  const theme = useTheme<Theme>();
  const {cardPrimaryBackground} = theme.colors;
  // ...
};
```

By doing this instead of directly importing the theme object, it becomes easy to swap the theme out during runtime to for example implement a [dark mode switch](/guides/dark-mode) in your app.
