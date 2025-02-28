import { useRef, useState } from "react";
import { isFunction } from "lodash-es";
import { useConstant } from "./useConstant";
import { Falsy } from "@lib/types";

export function useGetState<T>(initialState: T | (() => T)) {
  const [state, setState_] = useState(initialState);
  const ref = useRef(state);

  const setState = useConstant((newState: T | ((prevState: T) => T)) => {
    ref.current = isFunction(newState) ? newState(ref.current) : newState;
    setState_(ref.current);
  });

  const getState = useConstant(() => ref.current);

  return [state, setState, getState] as const;
}

export function useGetSetState<T extends object>(initialState: T | (() => T)) {
  const [state, setState_, getState] = useGetState(initialState);
  const setState = useConstant(
    (newState: Falsy | Partial<T> | ((prevState: T) => Partial<T> | Falsy)) => {
      setState_(state => {
        const nextState = isFunction(newState) ? newState(state) : newState;
        return !nextState ? state : { ...state, ...nextState };
      });
    }
  );

  return [state, setState, getState] as const;
}
