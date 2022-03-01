import {
  angleIcon,
  ClarityIcons,
  ellipsisVerticalIcon,
  ellipsisVerticalIconName,
  stepForward2Icon,
} from '@cds/core/icon';
import {CdsButton, CdsIconButton} from '@cds/react/button';
import {CdsIcon} from '@cds/react/icon';
import {forwardRef, useEffect, useRef, useState} from 'react';
import {
  ColumnGroup,
  TableInstance,
  TableOptions,
  usePagination,
  UsePaginationInstanceProps,
  UsePaginationState,
  useRowSelect,
  useTable,
} from 'react-table';
import {useClickAway} from 'react-use';

import AppDropdown from './AppDropdown';
import AppLoading from './AppLoading';

ClarityIcons.addIcons(stepForward2Icon);
ClarityIcons.addIcons(angleIcon);
ClarityIcons.addIcons(ellipsisVerticalIcon);

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = forwardRef(
  ({indeterminate, onChange, setSelectedRow, selectedFlatRows, ...rest}: any, ref) => {
    const defaultRef = useRef<any>();
    const resolvedRef: any = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current!.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <input
        type="checkbox"
        ref={resolvedRef}
        {...rest}
        onChange={e => {
          onChange(e);
          console.log(e);
          // setSelectedRow(selectedFlatRows);  // TODO: hoping to emit selected rows; selectedFlatRows was the previous state;
          // if uncomment this, it will trigger dropdown open if const [dropdownOpen, setDropdownOpen] = useState(checked) used checked instead of false
        }}
      />
    );
  },
);
// eslint-disable-next-line react/display-name
const IndeterminateRadio = forwardRef(({indeterminate, ...rest}: any, ref) => {
  const defaultRef = useRef<any>();
  const resolvedRef: any = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current!.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <input type="radio" name="select-radio" ref={resolvedRef} {...rest} />;
});
// eslint-disable-next-line react/display-name
const IndeterminateButton = forwardRef(({indeterminate, actionList, onClick, checked, ...rest}: any, ref) => {
  const defaultRef = useRef<any>();
  const resolvedRef: any = ref || defaultRef;
  const [dropdownOpen, setDropdownOpen] = useState(false); // TODO: if using checked, radio selection will trigger dropdown open;
  // if using false, first time load, click button won't trigger dropdown open... it seems this component is fully refreshed

  useEffect(() => {
    resolvedRef.current!.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  const profileRef = useRef(null);
  useClickAway(profileRef, () => {
    setDropdownOpen(false);
  });

  return (
    <div className="relative flex" ref={profileRef}>
      <button
        className="ml-4"
        ref={resolvedRef}
        {...rest}
        onClick={() => {
          onClick();
          setDropdownOpen(true);
        }}
      >
        <CdsIcon shape={ellipsisVerticalIconName} />
      </button>
      <div>{dropdownOpen && <AppDropdown>{actionList}</AppDropdown>}</div>
    </div>
  );
});

export interface TableProps {
  selectMode?: 'single' | 'multi';
  actionList?: React.ReactNode;
  setSelectedRow: React.Dispatch<React.SetStateAction<any>>;
  columns: ColumnGroup;
  data: any[];
  total: number;
  caption?: string;
  fetchData: (param: any) => void;
  loading: boolean;
  pageCount: number;
}

// TODO: missing error handling...
// TODO: types
export default function ReactTable({
  selectMode, // single, multi, undefined
  actionList,
  setSelectedRow,
  columns,
  data,
  total,
  caption,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}: any) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)

    page, // Instead of using 'rows', we'll use page, which has only the rows for the active page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: {hiddenColumns, pageIndex, pageSize, selectedRowIds},
  } = useTable(
    {
      columns,
      data,
      initialState: {pageIndex: 0},
      manualPagination: true, // Tell the usePagination hook that we'll handle our own data fetching
      // This means we'll also have to provide our own pageCount.
      pageCount: controlledPageCount,
    } as TableOptions<object>,
    usePagination,
    useRowSelect,
    hooks => {
      if (!selectMode) {
        return;
      }

      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({getToggleAllPageRowsSelectedProps}: any) => (
            <div className="flex gap-2 justify-center items-center">
              {selectMode === 'multi' && <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />}

              {/* take place to make sure checkbox aligns with cell checkbox */}
              <div className="w-7 h-5"> </div>
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({row, toggleAllRowsSelected, toggleRowSelected, selectedFlatRows, ...rest}: any) => {
            const currentState = row.getToggleRowSelectedProps();

            return (
              <div className="flex gap-2 justify-center items-center">
                {selectMode === 'multi' && (
                  <IndeterminateCheckbox
                    {...row.getToggleRowSelectedProps()}
                    setSelectedRow={setSelectedRow}
                    selectedFlatRows={selectedFlatRows}
                  />
                )}
                {selectMode === 'single' && (
                  <IndeterminateRadio
                    {...currentState}
                    onClick={() => {
                      setSelectedRow(row.original);

                      toggleAllRowsSelected(false);
                      toggleRowSelected(row.id, !currentState.checked);
                    }}
                  />
                )}
                {actionList && (
                  <IndeterminateButton
                    actionList={actionList}
                    {...currentState}
                    onClick={() => {
                      setSelectedRow(row.original);
                      // setSelectedRow(selectedFlatRows); // radio works, but button not
                      toggleAllRowsSelected(false);
                      toggleRowSelected(row.id, true);
                    }}
                  />
                )}
              </div>
            );
          },
        },
        ...columns,
      ]);
    },
  ) as any;

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    let cancel = false;

    if (cancel) return;
    fetchData({pageIndex, pageSize});

    return () => {
      cancel = true;
    };
  }, [fetchData, pageIndex, pageSize]);

  // TODO: good if can emit here
  // useEffect(() => {
  //   console.log(selectedFlatRows);

  //   setSelectedRow(selectedFlatRows);
  // }, [selectedFlatRows.length]);

  return (
    <>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
              data,
            },
            null,
            2,
          )}
        </code>
      </pre> */}

      {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map((d: any) => d.original),
            },
            null,
            2,
          )}
        </code>
      </pre> */}
      <table {...getTableProps()} cds-table="border:row border:outside" cds-text="left" className="w-full text-sm">
        <caption className="mb-3 text-2xl">{caption}</caption>
        <thead>
          {headerGroups.map((headerGroup: any, i: any) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column: any, j: any) => (
                <th {...column.getHeaderProps()} key={j}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="relative">
          {page.map((row: any, i: number) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell: any, j: number) => {
                  return (
                    <td {...cell.getCellProps()} key={j}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {loading && (
            <tr>
              <td colSpan={1000} className="absolute min-h-[100px] inset-[1px] bg-gray-100 dark:bg-gray-800">
                <AppLoading />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      <div className="border-r border-b border-l dark:border-gray-600 p-2 flex gap-2 text-xs items-center">
        <CdsIconButton
          aria-label={'common.gotoFirstPage'}
          action="outline"
          size="sm"
          onClick={() => {
            gotoPage(0);
          }}
          disabled={!canPreviousPage}
        >
          <CdsIcon direction="down" shape="step-forward-2"></CdsIcon>
        </CdsIconButton>
        <CdsIconButton
          aria-label={'common.gotoPreviousPage'}
          size="sm"
          onClick={() => {
            previousPage();
          }}
          disabled={!canPreviousPage}
        >
          <CdsIcon direction="left" shape="angle"></CdsIcon>
        </CdsIconButton>
        <CdsIconButton aria-label={'common.gotoNextPage'} size="sm" onClick={() => nextPage()} disabled={!canNextPage}>
          <CdsIcon direction="right" shape="angle"></CdsIcon>
        </CdsIconButton>
        <CdsIconButton
          aria-label={'common.gotoLastPage'}
          size="sm"
          action="outline"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <CdsIcon shape="step-forward-2"></CdsIcon>
        </CdsIconButton>
        <span>
          Page &nbsp;
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          showing {pageIndex * pageSize + 1} - {pageIndex * pageSize + 1 + Math.min(pageSize - 1, page.length - 1)} of{' '}
          {total} items
        </span>
        <span>
          <span>| Go to page: &nbsp;</span>
          <input
            aria-label="go to page"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{width: '100px'}}
          />
        </span>
        <select
          aria-label="select size"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
