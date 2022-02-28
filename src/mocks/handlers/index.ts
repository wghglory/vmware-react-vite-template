import authHandlers from './auth';
import tenantHandlers from './tenant';

export const handlers = [...authHandlers, ...tenantHandlers];
