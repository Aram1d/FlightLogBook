import {
  AriaRole,
  Fragment,
  Key,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  Box,
  BoxProps,
  Checkbox,
  Collapse,
  Group,
  LoadingOverlay,
  MantineSpacing,
  NumberInput,
  Pagination,
  Radio,
  ScrollArea,
  ScrollAreaProps,
  Select,
  Stack,
  Table,
  TableProps,
  Text
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";
import { isEmpty, isFunction, noop } from "lodash-es";
import { castStateValue, itemEnabledFor, toggleRows } from "./dataTable.utils";
import {
  DataTableColumn,
  DataTableFooterColumn,
  DataTableExpansion,
  DataTablePagination,
  DataTableRow,
  DataTableSelection
} from "./DataTable.types";
import { Empty, SpaceBetween } from "@components";
import { useElementRect, useEventCallback } from "@hooks";
import { animationCallback, cn, stopPropagation } from "@lib";
import classes from "./DataTable.module.css";

export interface DataTableProps<T, F> extends BoxProps {
  items: T[];
  loading?: boolean;
  columns: DataTableColumn<T>[];
  rowKey: keyof T | ((item: T) => Key);
  empty?: ReactNode;
  emptyMsg?: ReactNode;
  expansion?: DataTableExpansion<T>;
  selection?: DataTableSelection<T>;
  pagination?: DataTablePagination;
  horizontalSpacing?: MantineSpacing;
  tableProps?: TableProps;
  scrollAreaProps?: ScrollAreaProps;
  onRowClick?: (item: T, row: DataTableRow<T>) => void;
  role?: AriaRole;
  footer?: {
    columns: DataTableFooterColumn<F>[];
    item: F | null | undefined;
  };
}

export function DataTable<T, F>({
  items,
  loading,
  columns,
  rowKey,
  empty,
  emptyMsg,
  expansion,
  selection,
  pagination,
  horizontalSpacing = "md",
  tableProps,
  scrollAreaProps,
  onRowClick,
  footer,
  ...props
}: DataTableProps<T, F>) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [headerRef, headerRect] = useElementRect<HTMLTableSectionElement>();
  const pointer = Boolean(onRowClick || selection || expansion);
  const getRowKey = useMemo(
    () => (isFunction(rowKey) ? rowKey : (row: T) => row[rowKey] as Key),
    [rowKey]
  );

  // Expansion and selection states

  const [expandedItems, setExpandedItems] = useUncontrolled({
    value: expansion?.expanded,
    defaultValue: expansion?.defaultExpanded,
    finalValue: [],
    onChange: expansion?.onExpandedChange
  });

  const [selectedItems, setSelectedItems] = useUncontrolled(
    selection?.multiple
      ? {
          value: selection?.selection,
          defaultValue: selection?.defaultSelection,
          finalValue: [],
          onChange: selection?.onSelectionChange
        }
      : {
          value: castStateValue(selection?.selection),
          defaultValue: castStateValue(selection?.defaultSelection),
          finalValue: [],
          onChange: ([node]) => {
            selection?.onSelectionChange?.(node ?? null);
          }
        }
  );

  const mappedExpandedItems = useMemo(
    () => new Map(expandedItems.map(item => [getRowKey(item), item])),
    [expandedItems, getRowKey]
  );

  const mappedSelectedItems = useMemo(
    () => new Map(selectedItems.map(item => [getRowKey(item), item])),
    [selectedItems, getRowKey]
  );

  const toggleRowsExpansion = useEventCallback((rows: DataTableRow<T>[]) =>
    setExpandedItems(toggleRows(rows, mappedExpandedItems, expansion?.multiple))
  );

  const toggleRowsSelection = useEventCallback((rows: DataTableRow<T>[]) =>
    setSelectedItems(toggleRows(rows, mappedSelectedItems, selection?.multiple))
  );

  // Data enrichment

  const rows = items.map<DataTableRow<T>>((item, index) => {
    const key = getRowKey(item);
    return {
      item,
      key,
      index,
      expanded:
        mappedExpandedItems.has(key) || Boolean(expansion?.forceExpanded),
      selected: mappedSelectedItems.has(key),
      expandable: itemEnabledFor(item, expansion),
      selectable: itemEnabledFor(item, selection)
    };
  });

  // Columns

  const allRowsSelected = rows.every(row => !row.selectable || row.selected);
  const someRowsSelected = rows.some(row => row.selected);
  const indeterminate = !allRowsSelected && someRowsSelected;

  const selectionColumn: DataTableColumn<T> = {
    hidden: !selection,
    className: classes.selectionCell,
    title: selection?.multiple && (
      <Checkbox
        checked={allRowsSelected}
        indeterminate={indeterminate}
        aria-label="select-all"
        aria-checked={indeterminate ? "mixed" : allRowsSelected}
        onChange={stopPropagation(e =>
          toggleRowsSelection(
            e.target.checked
              ? rows.filter(row => row.selectable && !row.selected)
              : rows.filter(row => row.selected)
          )
        )}
      />
    ),
    render: (_, row) => (
      <Box
        component={(selection?.multiple ? Checkbox : Radio) as typeof Checkbox}
        aria-label={`checkable-${row.key}`}
        aria-checked={row.selected}
        disabled={!row.selectable}
        checked={row.selected}
        onChange={noop}
        onClick={stopPropagation(() => toggleRowsSelection([row]))}
      />
    )
  };

  const visibleColumns = [selectionColumn, ...columns].filter(
    column => !column.hidden
  );

  // Scroll shadows

  const [leftShadow, setLeftShadow] = useState(false);
  const [rightShadow, setRightShadow] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const handleChange = animationCallback(() => {
      const { clientWidth, scrollWidth, scrollLeft } = viewport;
      const hasXScroll = scrollWidth > clientWidth;
      setLeftShadow(hasXScroll && scrollLeft > 0);
      setRightShadow(hasXScroll && scrollWidth - scrollLeft - clientWidth > 1);
    });
    const observer = new ResizeObserver(handleChange);
    observer.observe(viewport);
    viewport.addEventListener("scroll", handleChange);
    return () => {
      observer.disconnect();
      viewport.removeEventListener("scroll", handleChange);
    };
  }, []);

  // Render

  return (
    <Stack {...props} mih={0} flex={1}>
      <Box pos="relative" mih={0} flex={1}>
        <ScrollArea viewportRef={viewportRef} {...scrollAreaProps} h="100%">
          <Table
            striped
            highlightOnHover
            horizontalSpacing={horizontalSpacing}
            {...tableProps}
            className={cn(classes.table, tableProps?.className)}
          >
            <Table.Thead ref={headerRef} pos="sticky" bg="inherit">
              <Table.Tr>
                {visibleColumns.map(
                  ({ title, hidden, render, onCellClick, ...props }, index) => (
                    <Table.Th key={index} {...props}>
                      {title}
                    </Table.Th>
                  )
                )}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.map(row => {
                const {
                  item,
                  key,
                  expanded,
                  selected,
                  expandable,
                  selectable
                } = row;

                const handleClick = () => {
                  onRowClick?.(item, row);
                  expandable && toggleRowsExpansion([row]);
                  selectable && toggleRowsSelection([row]);
                };

                return (
                  <Fragment key={key}>
                    <Table.Tr
                      aria-label={String(key)}
                      aria-expanded={expanded}
                      onClick={handleClick}
                      className={cn(
                        classes.itemRow,
                        pointer && classes.pointer
                      )}
                    >
                      {visibleColumns.map(
                        (
                          { title, hidden, render, onCellClick, ...props },
                          index
                        ) => (
                          <Table.Td
                            key={index}
                            {...props}
                            className={cn(
                              selected && classes.selectedRowCell,
                              props.className
                            )}
                            onClick={e =>
                              onCellClick?.(e, {
                                item,
                                row,
                                column: visibleColumns[index]
                              })
                            }
                          >
                            {render(item, row)}
                          </Table.Td>
                        )
                      )}
                    </Table.Tr>
                    {expandable && (
                      <>
                        <Table.Tr role="none" className={classes.dummyRow} />
                        <Table.Tr
                          aria-hidden={!expanded}
                          className={cn(!expanded && classes.dummyRow)}
                        >
                          <Table.Td
                            colSpan={visibleColumns.length}
                            className={classes.expansionCell}
                          >
                            <Collapse in={expanded}>
                              {expansion?.render(item, row)}
                            </Collapse>
                          </Table.Td>
                        </Table.Tr>
                      </>
                    )}
                  </Fragment>
                );
              })}
              {footer?.item && (
                <Table.Tr className={cn(classes.itemRow)}>
                  {footer.columns.map((col, index) => {
                    if (col && footer.item) {
                      const { render, ...column } = col;
                      return (
                        <Table.Td key={index} {...column}>
                          {render(footer.item)}
                        </Table.Td>
                      );
                    }
                    return <Table.Td key={index} />;
                  })}
                </Table.Tr>
              )}
              {isEmpty(items) && (
                <Table.Tr role="none" className={classes.emptyRow}>
                  <Table.Td colSpan={visibleColumns.length}>
                    {empty ?? <Empty my="sm" message={emptyMsg} />}
                  </Table.Td>
                </Table.Tr>
              )}
              <Table.Tr role="none" className={classes.dummyRow} />
            </Table.Tbody>
          </Table>
          <Box
            opacity={leftShadow ? 1 : 0}
            className={cn(classes.shadow, classes.shadowLeft)}
          />
          <Box
            opacity={rightShadow ? 1 : 0}
            className={cn(classes.shadow, classes.shadowRight)}
          />
        </ScrollArea>
        <LoadingOverlay
          role="progressbar"
          visible={loading}
          top={headerRect.height}
          overlayProps={{
            classNames: {
              root: classes.loadingOverlay
            }
          }}
        />
      </Box>
      {pagination && (
        <SpaceBetween py="xs" px={horizontalSpacing}>
          <Group>
            {pagination.page && (
              <Text fz="sm">
                {`${(pagination.page - 1) * pagination.limit + 1} - ${Math.min(pagination.page * pagination.limit, pagination.total)} / ${pagination.total}`}
              </Text>
            )}
            {typeof pagination.shift === "number" && (
              <Group gap="xs">
                <Text size="xs">Offset</Text>
                <NumberInput
                  w={80}
                  value={pagination.shift}
                  onChange={pagination.onShiftChange}
                  classNames={{
                    input: classes.pss,
                    controls: classes.pssControls
                  }}
                />
              </Group>
            )}
          </Group>
          <Group>
            {pagination.availableLimits &&
              (pagination.availableLimits?.length ?? 0) > 1 && (
                <Group gap="xs">
                  <Text size="xs">Records per page</Text>
                  <Select
                    classNames={{ input: classes.pss }}
                    data={pagination.availableLimits.map(n => n.toString())}
                    value={pagination.limit.toString()}
                    onChange={v =>
                      v && pagination.onLimitChange?.(parseInt(v, 10))
                    }
                    withCheckIcon={false}
                    size="xs"
                    w={60}
                  />
                </Group>
              )}

            <Pagination
              size="sm"
              total={Math.ceil(pagination.total / pagination.limit)}
              value={pagination.page}
              defaultValue={pagination.defaultPage}
              onChange={pagination.onPageChange}
            />
          </Group>
        </SpaceBetween>
      )}
    </Stack>
  );
}
