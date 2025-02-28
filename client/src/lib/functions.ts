import { compact, flattenDeep, noop } from "lodash-es";
import { Pack } from "./types";

export function pack<T>(...args: Pack<T>[]): T[] {
  return compact(flattenDeep(args));
}

export function cn(...classes: Pack<string>[]) {
  return pack(...classes)
    .map(c => (c.startsWith(".") ? c.substring(1) : c))
    .join(" ");
}

export function stopPropagation<
  E extends { stopPropagation(): void },
  R extends any[]
>(handler: (event: E, ...rest: R) => void = noop) {
  return (event: E, ...rest: R) => {
    event.stopPropagation();
    handler(event, ...rest);
  };
}

export function animationCallback<T extends any[]>(
  callback: (...args: T) => void
) {
  let frame: null | number = null;
  return (...args: T) => {
    if (frame !== null) {
      cancelAnimationFrame(frame);
    }
    frame = requestAnimationFrame(() => {
      callback(...args);
      frame = null;
    });
  };
}
