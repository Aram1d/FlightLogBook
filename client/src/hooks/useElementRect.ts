import { useLayoutEffect, useRef, useTransition } from "react";
import { useGetState } from "./useGetState";

export function useElementRect<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [, startTransition] = useTransition();
  const [rect, setRect, getRect] = useGetState<ElementRect>(defaultRect);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      setRect(element.getBoundingClientRect());
    };

    update();

    const observer = new ResizeObserver(() => startTransition(update));
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [setRect]);

  return [ref, rect, getRect] as const;
}

export type ElementRect = Omit<DOMRect, "toJSON">;

const defaultRect: ElementRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};
