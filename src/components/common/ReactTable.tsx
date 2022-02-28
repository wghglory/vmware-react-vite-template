import {angleIcon, ClarityIcons, stepForward2Icon} from '@cds/core/icon';
import {CdsIconButton} from '@cds/react/button';
import {CdsIcon} from '@cds/react/icon';
import {useEffect} from 'react';
import {
  TableInstance,
  TableOptions,
  usePagination,
  UsePaginationInstanceProps,
  UsePaginationState,
  useTable,
} from 'react-table';

import AppLoading from './AppLoading';

ClarityIcons.addIcons(stepForward2Icon);
ClarityIcons.addIcons(angleIcon);

// TODO: missing error handling...
export default function ReactTable({columns, data, caption, fetchData, loading, pageCount: controlledPageCount}: any) {
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
    // setPageSize,
    state,
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
  ) as UsePaginationInstanceProps<object> & TableInstance<object>;

  const {pageIndex, pageSize} = state as UsePaginationState<object>;

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    let cancel = false;

    if (cancel) return;
    fetchData({pageIndex, pageSize});

    return () => {
      cancel = true;
    };
  }, [fetchData, pageIndex, pageSize]);

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
            },
            null,
            2,
          )}
        </code>
      </pre> */}
      <table {...getTableProps()} cds-table="border:row border:outside" cds-text="center" className="w-full">
        <caption>{caption}</caption>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <th {...column.getHeaderProps()} key={j}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
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
          <tr>
            {loading ? (
              <td colSpan={10000}>
                <AppLoading />
              </td>
            ) : (
              <td colSpan={10000} cds-text="right">
                Showing {page.length} of ~{controlledPageCount * pageSize} results
              </td>
            )}
          </tr>
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
        {/* <span>
            <span>| Go to page: &nbsp;</span>
            <input
              aria-label='go to page'
              type='number'
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: '100px' }}
            />
          </span>
          <select
            aria-label='select size'
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select> */}
      </div>
    </>
  );
}
