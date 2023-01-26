---
id: overriding-styles
title: Overriding styles
---

Any Restyle component also accepts a regular `style` property and will apply it after all other styles, which means that you can use this to do any overrides that you might find necessary.

```tsx
<Box
  margin="s"
  padding="m"
  style={{
    backgroundColor: '#F00BAA',
  }}
/>
```
