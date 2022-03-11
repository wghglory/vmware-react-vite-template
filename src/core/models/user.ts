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

export interface SignInResponse {
  user: {
    email: string;
    role: Role;
    token: string;
    username: string;
    name: string;
  };
}

export type Role = 'SYSTEM_OPERATOR' | 'PROVIDER_ADMIN' | 'TENANT_ADMIN' | 'TENANT_USER';
