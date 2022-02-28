import {User} from '@/models/user';

const users: User[] = [
  {
    id: 'admin',
    name: 'Admin',
    username: 'admin',
    password: 'test',
    role: 'PROJECT_ADMIN',
    email: 'admin@vmware.com',
  },
  {
    id: 'williamz',
    name: 'William Zhou',
    username: 'williamz',
    password: 'vmware',
    role: 'PROJECT_ADMIN',
    email: 'williamz@vmware.com',
  },
  {
    id: 'test',
    name: 'Test',
    username: 'test',
    password: 'vmware',
    role: 'TENANT_USER',
    email: 'test@vmware.com',
  },
];

export default users;
