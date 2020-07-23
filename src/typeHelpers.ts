export const getKeys = <T>(object: T) => Object.keys(object) as (keyof T)[];
