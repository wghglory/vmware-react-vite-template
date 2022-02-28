export interface User {
  username: string;
  password?: string;
  email: string;
  name: string;
  id: string;
  role: Role;
}

export interface SignInPayload {
  username: string;
  password: string;
}

export type Role = 'PROJECT_ADMIN' | 'TENANT_USER';
