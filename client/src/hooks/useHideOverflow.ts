import React, { useLayoutEffect, useRef } from "react";
import { useElementSize, useMergedRef, useViewportSize } from "@mantine/hooks";
import { compact, dropRight, last } from "lodash-es";

type UseHideOverflowProps = {
  gap: number;
  deps?: any[];
};
export const useHideOverflow = ({
  gap = 0,
  deps = []
}: UseHideOverflowProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const { ref: sizeRef, width } = useElementSize<HTMLDivElement>();
  const ref = useMergedRef(elementRef, sizeRef);
  const { width: vw } = useViewportSize();
  const [shownItems, setShownItems] = React.useState(Infinity);

  useLayoutEffect(() => {
    if (!elementRef.current) return;
    const widthColl = getWidthsFromElt(elementRef.current);
    const collapsibleWidthColl = dropRight(widthColl, 1);
    const reducedWidth = width - (last(widthColl) ?? 0 + gap);
    let shownItems = 0;
    let cumulatedWidth = 0;

    for (const c of compact(collapsibleWidthColl)) {
      if (c === 0) continue;
      cumulatedWidth += c + gap;
      if (
        cumulatedWidth >
        (last(collapsibleWidthColl) === c ? width : reducedWidth)
      )
        break;
      shownItems++;
    }
    setShownItems(shownItems);
  }, [gap, width, vw, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, shownItems };
};

function isNodeElt(node: Node): node is HTMLElement {
  return node instanceof HTMLElement;
}

const getWidthsFromElt = ({ childNodes }: HTMLDivElement) =>
  compact(
    Array.from(childNodes).map(n =>
      isNodeElt(n) ? n.getBoundingClientRect().width : 0
    )
  );
