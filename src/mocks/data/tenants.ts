import {Tenant} from '@/models';

const tenants: Tenant[] = [
  {
    id: 'acme',
    name: 'ACME',
    fullName: 'ACME full name',
    enabled: true,
    lastModifiedDate: '2022-01-01',
  },
  {
    id: 'coke',
    name: 'Coke',
    fullName: 'Coke full name',
    enabled: true,
    lastModifiedDate: '2022-01-02',
  },
];

export default tenants;
