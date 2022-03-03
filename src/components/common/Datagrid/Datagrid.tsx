import {CdsIcon} from '@cds/react/icon';
import DataTable from 'react-data-table-component';

import DatagridLoading from './DatagridLoading';

export interface TableProps<T> {
  data: T[];
  columns: any;
  onSelectedRowsChange?:
    | ((selected: {allSelected: boolean; selectedCount: number; selectedRows: T[]}) => void)
    | undefined;
  progressPending: boolean;
  paginationTotalRows: number;
  onChangePage: (page: number, totalRows: number) => void;
  onChangeRowsPerPage: (currentRowsPerPage: number, currentPage: number) => void;
  selectableRows?: boolean;
  selectableRowsSingle?: boolean;
  keyField?: string;
}

const sortIcon = <CdsIcon shape="arrow" />;
const selectProps = {indeterminate: (isIndeterminate: boolean) => isIndeterminate};

export default function Datagrid<T>(props: TableProps<T>): JSX.Element {
  const selectableRowsComponentProps = {
    type: props.selectableRowsSingle ? 'radio' : 'checkbox',
  };

  return (
    <DataTable
      // dense
      fixedHeader
      // fixedHeaderScrollHeight="300px"
      pagination
      responsive
      highlightOnHover
      progressComponent={<DatagridLoading />}
      // selectableRowsHighlight
      selectableRowsComponentProps={selectableRowsComponentProps}
      subHeaderWrap
      paginationServer
      // theme="solarized"
      // sortIcon={sortIcon}
      {...props}
    />
  );
}
