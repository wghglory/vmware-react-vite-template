const common = {
  'common.product': 'Global Catalog',
  'common.productShort': 'GC',
  'common.retry': 'Retry',
  'common.selectAll': 'Select All',
  'common.confirm': 'Confirm',
  'common.back': 'Go Back',
  'common.cancel': 'Cancel',
  'common.lastModifiedDate': 'Last Modified',
  'common.tenants': 'Tenants',
  'common.apiToken': 'API Token',
  'common.about': 'About',
  'common.notFound': '404 Not Found',
  'common.pending': 'Pending',
  'common.status': 'Status',
  'common.required': 'Required',
  'common.save': 'Save',
  'common.next': 'Next',
  'common.previous': 'Previous',
  'common.reset': 'Reset',
  'common.resetting': 'Resetting',
  'common.activate': 'Activate',
  'common.active': 'Active',
  'common.deactivate': 'Deactivate',
  'common.inactive': 'Inactive',
  'common.fullName': 'Full Name',
  'common.name': 'Name',
  'common.total': 'Total {0} items',
};

const auth = {
  'auth.username': 'Username',
  'auth.password': 'Password',
  'auth.login': 'Login',
  'auth.token': 'Token',
  'auth.logout': 'Logout',
  'auth.checkingUserInfo': 'Checking user information...',
};

const tenant = {
  'tenant.loadingTenant': 'Loading Tenant...',
  'tenant.activateTitle': 'Activate Tenant',
  'tenant.deactivateTitle': 'Deactivate Tenant',
  'tenant.resetTitle': 'Reset Tenant',
  'tenant.activateContent': 'Please confirm if you want to activate tenant <strong>{0}</strong>.',
  'tenant.deactivateContent': 'Please confirm if you want to deactivate tenant <strong>{0}</strong>.',
  'tenant.resetContent':
    'Please confirm if you want to reset tenant <strong>{0}</strong>. You may need to go to Azure portal and transfer subscription back to the home directory.',
};

export const ENGLISH = {
  ...common,
  ...auth,
  ...tenant,
};
