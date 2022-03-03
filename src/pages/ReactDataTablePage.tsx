import {CdsTag} from '@cds/react/tag';
import {useCallback, useEffect, useState} from 'react';
import {TableColumn} from 'react-data-table-component';
import {Link} from 'react-router-dom';

import Datagrid from '@/components/common/Datagrid/Datagrid';
import DatagridDropdown from '@/components/common/Datagrid/DatagridDropdown';
import PageContainer from '@/components/common/PageContainer';
import {l10n} from '@/i18n/i18nUtils';
import {Tenant} from '@/models';
import {getTenants} from '@/services/tenant.service';

const columns: TableColumn<Tenant>[] = [
  {
    cell: row => (
      <DatagridDropdown>
        <button
          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => alert(JSON.stringify(row, null, 2))}
        >
          Action 1
        </button>
        <button
          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => alert(JSON.stringify(row, null, 2))}
        >
          Action 2
        </button>
      </DatagridDropdown>
    ),
    allowOverflow: true,
    button: true,
    width: '56px',
  },
  {
    name: l10n('common.name'),
    selector: row => row.name,
    cell: row => (
      <Link className="ml-2" cds-text="link" to={`/tenants/${row.id}`} state={{tenant: row}}>
        {row.name}
      </Link>
    ),
    sortable: true,
    minWidth: '200px',
  },
  {
    name: l10n('common.fullName'),
    selector: row => row.fullName,
  },
  {
    name: l10n('common.status'),
    selector: row => row.enabled,
    cell: row => (
      <CdsTag className="align-middle" readonly status={row.enabled ? 'success' : 'neutral'}>
        {row.enabled ? l10n('common.active') : l10n('common.inactive')}
      </CdsTag>
    ),
    sortable: true,
  },
  {
    name: l10n('common.lastModifiedDate'),
    selector: row => row.lastModifiedDate,
    sortable: true,
  },
];

export default function ReactDataTablePage() {
  const [data, setData] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = useCallback(
    pageIndex => {
      setLoading(true);

      getTenants({offset: pageIndex * pageSize, limit: pageSize}).then(res => {
        setData(res.data.items);
        setTotal(res.data.page_info.total);
        setLoading(false);
      });
    },
    [pageSize],
  );

  useEffect(() => {
    fetchData(0); // fetch page 1 of users
  }, [fetchData]);

  const handlePageChange = (page: number) => {
    fetchData(page - 1);
  };
  const handleSelectionChange = ({selectedRows}: any) => {
    console.log('Selected Rows: ', selectedRows);
  };
  const handlePageSizeChange = async (pageSize: number, page: number) => {
    setLoading(true);
    const pageIndex = page - 1;

    getTenants({offset: pageIndex * pageSize, limit: pageSize}).then(res => {
      setData(res.data.items);
      setTotal(res.data.page_info.total);
      setPageSize(pageSize);
      setLoading(false);
    });
  };

  return (
    <PageContainer title="React Data Table Page (remove when clarity core v6 datagrid arrives)">
      <Datagrid
        columns={columns}
        data={data}
        progressPending={loading}
        selectableRows
        // selectableRowsSingle
        paginationTotalRows={total}
        onSelectedRowsChange={handleSelectionChange}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePageSizeChange}
      />
    </PageContainer>
  );
}
