import {useEffect} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {generatePageQueryString, PageModel, PageQuery, Tenant} from '@/models';
import http from '@/utils/axios';

export function useGetTenants(pageQuery: PageQuery) {
  return useQuery<PageModel<Tenant>, Error>(['getTenants', {...pageQuery}], () => getTenants(pageQuery), {
    keepPreviousData: true,
    // staleTime: 5000,
  });
}

export function usePrefetchTenants({data, page, pageSize}: any, pageQuery: PageQuery) {
  const queryClient = useQueryClient();

  const shouldFetchNextPage = data && data.page_info.total > page * pageSize;

  useEffect(() => {
    if (shouldFetchNextPage) {
      queryClient.prefetchQuery(['getTenants', {...pageQuery}], () => getTenants(pageQuery));
    }
  }, [pageQuery, queryClient, shouldFetchNextPage]);
}

export async function getTenants(pageQuery: PageQuery) {
  // order: name desc|asc
  // filter: (name==*s*;enabled==false)
  const queryString = generatePageQueryString(pageQuery);

  return await http.get(`/core/tenants?${queryString}`).then(res => res.data);
}

export async function deleteTenant({id}: {id: string}) {
  return await http.delete(`/core/tenants/${id}`, {
    data: {
      payload: 'axios DELETE payload needs to wrap with data, unlike POST or PUT',
    },
  });
}
