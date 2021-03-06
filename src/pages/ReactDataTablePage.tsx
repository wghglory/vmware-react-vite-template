import {CdsTag} from '@cds/react/tag';
import {TableColumn} from 'react-data-table-component';
import {Link} from 'react-router-dom';

import Datagrid from '@/components/common/Datagrid/Datagrid';
import DatagridDropdown from '@/components/common/Datagrid/DatagridDropdown';
import PageContainer from '@/components/common/PageContainer';
import useDatagrid from '@/hooks/useDatagrid';
import {l10n} from '@/i18n/i18nUtils';
import {Tenant} from '@/models';
import {useGetTenants, usePrefetchTenants} from '@/services/tenant.service';

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
  const {page, pageSize, selectedRows, handlePageSizeChange, setSelectedRows, handlePageChange} = useDatagrid();

  const tenantQuery = useGetTenants({offset: (page - 1) * pageSize, limit: pageSize});

  usePrefetchTenants(
    {
      data: tenantQuery.data,
      page,
      pageSize,
    },
    {
      offset: (page - 1 + 1) * pageSize, // next page offset
      limit: pageSize,
    },
  );

  return (
    <PageContainer title="React Data Table Page (remove when clarity core v6 datagrid arrives)">
      <Datagrid
        columns={columns}
        data={tenantQuery.data?.items || []}
        progressPending={tenantQuery.isLoading}
        selectableRows
        // selectableRowsSingle
        paginationTotalRows={tenantQuery.data?.page_info.total || 0}
        onSelectedRowsChange={({selectedRows}) => setSelectedRows(selectedRows)}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePageSizeChange}
        // keyField="id"  // if id is tenantId, update here
      />
    </PageContainer>
  );
}
