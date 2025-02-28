import { useRef } from "react";

export function useConstant<T>(value: T) {
  return useRef(value).current;
}
