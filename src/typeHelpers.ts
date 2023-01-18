export const getKeys = <T extends {[key: string]: any}>(object: T) =>
  Object.keys(object) as (keyof T)[];
