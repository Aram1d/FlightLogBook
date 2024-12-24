import { compact, flattenDeep } from "lodash-es";
import { Pack } from "./types";

export function pack<T>(...args: Pack<T>[]): T[] {
  return compact(flattenDeep(args));
}

export function cn(...classes: Pack<string>[]) {
  return pack(...classes)
    .map(c => (c.startsWith(".") ? c.substring(1) : c))
    .join(" ");
}
