export type Pack<T> = T | Falsy | Array<Pack<T>>;
export type Falsy = null | undefined | false | "" | 0 | 0n;
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType[number];
