import {CdsTag} from '@cds/react/tag';
import {useCallback, useState} from 'react';
import {Link} from 'react-router-dom';

import ReactTable from '@/components/common/ReactTable';
import {formatDate, l10n} from '@/i18n/i18nUtils';
import {Tenant} from '@/models';
import {getTenants} from '@/services/tenantService';

export default function ReactTablePage() {
  const columns: any = [
    {
      Header: l10n('common.name'),
      accessor: 'name',
      Cell: (d: any) => {
        const tenant: Tenant = d.row.original;
        return (
          <Link className="ml-2" cds-text="link" to={`/tenants/${tenant.id}`} state={{tenant}}>
            {d.value}
          </Link>
        );
      },
    },
    {
      Header: l10n('common.fullName'),
      accessor: 'fullName',
    },
    {
      Header: l10n('common.status'),
      accessor: 'enabled',
      Cell: ({value}: {value: boolean}) => {
        return (
          <CdsTag className="align-middle" readonly status={value ? 'success' : 'neutral'}>
            {value ? l10n('common.active') : l10n('common.inactive')}
          </CdsTag>
        );
      },
    },
    {
      Header: l10n('common.lastModifiedDate'),
      accessor: 'lastModifiedDate',
      Cell: ({value}: {value: string}) => {
        return formatDate(new Date(value), 'MMMM d, y, h:mm:ss a');
      },
    },
  ];

  const [data, setData] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(({pageSize, pageIndex}) => {
    setLoading(true);

    getTenants({offset: pageIndex * pageSize, limit: pageSize}).then(res => {
      setData(res.data.items);
      setTotal(res.data.page_info.total);
      setPageCount(Math.ceil(res.data.page_info.total / res.data.page_info.limit));
      setLoading(false);
    });
  }, []);

  return (
    <div className="container mx-auto py-10 px-6">
      <h2 className="text-3xl">React Table Page (remove when clarity core v6 datagrid arrives)</h2>

      <ReactTable
        selectMode="multi"
        total={total}
        columns={columns}
        caption="Tenant Table"
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
      />
    </div>
  );
}
