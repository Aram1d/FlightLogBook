import React, { useLayoutEffect } from "react";
import { useElementSize, useViewportSize } from "@mantine/hooks";
import { compact, dropRight, last } from "lodash-es";

type UseHideOverflowProps = {
  gap: number;
  deps?: any[];
};
export const useHideOverflow = ({
  gap = 0,
  deps = []
}: UseHideOverflowProps) => {
  const { ref, width } = useElementSize<HTMLInputElement>();
  const { width: vw } = useViewportSize();
  const [shownItems, setShownItems] = React.useState(Infinity);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const widthColl = getWidthsFromElt(ref.current);
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
