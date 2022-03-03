import authHandlers from './auth.handler';
import tenantHandlers from './tenant.handler';

export const handlers = [...authHandlers, ...tenantHandlers];
