const common = {
  NOT_SET: 'Not Set',
  PENDING_CREATE: 'Pending Create',
  CREATED: 'Created',
  PENDING_SUBSCRIBE: 'Pending Subscribe',
  PENDING_UNSUBSCRIBE: 'Pending Unsubscribe',
  READY: 'Ready',
  ABNORMAL: 'Abnormal',

  AZURE_PORTAL_SUBSCRIPTION_DETAIL:
    'Please navigate to the Azure subscription detail page, click <strong>Change Directory</strong> button, and change the directory to <strong>{0}</strong>',
  AZURE_NEW_DIRECTORY_CONSENT: 'Consent to transfer the subscription <strong>(Do not enable 2FA)</strong>',
  AZURE_NEW_DIRECTORY_ADMIN_CONSENT: 'Consent to allow the new tenant to access Azure services',

  'common.retry': 'Retry',
  'common.selectAll': 'Select All',
  'common.confirm': 'Confirm',
  'common.back': 'Go Back',
  'common.cancel': 'Cancel',
  'common.proceed': 'Proceed',
  'common.lastModifiedDate': 'Last Modified',
  'common.errorContainer': 'Error Container',
  'common.product': 'Public Cloud Direct Link',
  'common.productShort': 'PCDL',
  'common.cloudConnection': 'Cloud Connection',
  'common.tenants': 'Tenants',
  'common.cloudServices': 'Cloud Services',
  'common.apiToken': 'API Token',
  'common.about': 'About',
  'common.notFound': '404 Not Found',
  'common.connect': 'Connect',
  'common.connected': 'Connected',
  'common.disconnect': 'Disconnect',
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
  'common.search': 'Search',
  'common.searchBy': 'Search {0}',
  'common.general': 'General',
  'common.total': 'Total {0} items',
  'common.ready': 'Ready',
  'common.notSet': 'Not Set',
};

const auth = {
  'auth.login': 'Login',
  'auth.token': 'Token',
  'auth.logout': 'Logout',
  'auth.checkingUserInfo': 'Checking user information...',
};

const cloudConnection = {
  'cloudConnection.addConnection': 'Add Cloud Connection',
  'cloudConnection.region': 'Region',
  'cloudConnection.accountId': 'Account ID',
  'cloudConnection.accessKey': 'Access Key',
  'cloudConnection.secretKey': 'Secret Key',
  'cloudConnection.masterSubscriptionId': 'Subscription ID',
  'cloudConnection.clientId': 'Application (client) ID',
  'cloudConnection.clientSecret': 'Application (client) Secret',
  'cloudConnection.homeDirectoryId': 'Directory (tenant) ID',
  'cloudConnection.masterSubscriptionIdHelpMessage':
    "Subscription ID can be found in azure portal subscription's overview",
  'cloudConnection.clientIdHelpMessage': "Application ID can be found in your application's overview",
  'cloudConnection.clientSecretHelpMessage': "Application Secret can be found in your application's overview",
  'cloudConnection.homeDirectoryIdHelpMessage': "Directory ID can be found in your application's overview",
  'cloudConnection.callbackUrl': 'Callback URL',
  'cloudConnection.selectProvider': 'Select Cloud Vendor',
  'cloudConnection.createConnection': 'Create Connection',
  'cloudConnection.connectAzure': 'Connect Azure',
  'cloudConnection.guide': 'Cloud connection guide container',
  'cloudConnection.disconnectionSuccess': 'Disconnect successfully.',
  'cloudConnection.gotoAzure': 'PROCEED ON AZURE',
  'cloudConnection.loadingCallbackURL': 'Loading Prerequisite...',
  'cloudConnection.discard': 'Discard',
  'cloudConnection.azureDesc':
    'Microsoft Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers.',
  'cloudConnection.awsDesc':
    "Amazon Web Services (AWS) is the world's most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally",
  'cloudConnection.googleDesc':
    'Google Cloud Platform (GCP) is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products alongside a series of modular cloud services including computing, data storage, data analytics and machine learning.',
  'cloudConnection.authorizePCDL':
    'Please authorize PCDL on your Azure home directory. By completing this step, PCDL can help to provision Azure resources on behalf. You will be redirected to the below link by clicking on the PROCEED button.',
  'cloudConnection.resetAccount': 'You can click {0} to restart.',
  'cloudConnection.prerequisite': 'Prerequisite',
  'cloudConnection.prerequisiteSubtitle':
    'Please complete below steps on Azure portal <a href={0} target="_blank" rel="noopener" cds-text="link">{0}</a> before you fill the connection parameters.',
  'cloudConnection.prerequisite1': 'Go to your home Azure Active Directory.',
  'cloudConnection.prerequisite2':
    'In <strong>App registrations</strong>, create a new registration named <strong class="italic">PCDL</strong>, with account type of <strong>Any Azure Directory - MultTenant</strong>, and Redirect URI <a href={0} target="_blank" rel="noopener" cds-text="link" style="cursor:unset;">{0}</a> in <strong>web</strong> type.',
  'cloudConnection.prerequisite3': 'Open the newly created application.',
  'cloudConnection.prerequisite4':
    'In <strong>API permissions</strong>, select <strong class="italic">Azure Service Management</strong>,  and add the permission <em>user_impersonation</em>.',
  // 'cloudConnection.prerequisite5':
  //   'In <strong>API permissions</strong>, select <strong class="italic">Microsoft Graph</strong>, click <strong>Delegated permissions</strong>, and add the permissions <em>Application.ReadWrite.All, IdentityProvider.ReadWrite.All, IdentityUserFlow.ReadWrite.All, User.ReadWrite.All</em>.',
  'cloudConnection.prerequisite6':
    'In <strong>Certificates & Secrets</strong>, create a secret with 6 months or longer lifetime. Please remember the plaintext of the secret since it is shown only once.',
};

const tenant = {
  'tenant.loadingTenant': 'Loading Tenant...',
  'tenant.serviceCount': 'Service Count',
  'tenant.userCount': 'User Count',
  'tenant.manageService': 'Manage Service',
  'tenant.platform': 'Platform',
  'tenant.notSet': 'Not Set',
  'tenant.onboard': 'Onboard',
  'tenant.onboarding': 'Onboarding',
  'tenant.onboardTitle': 'Onboard {0}',
  'tenant.onboardIntroduce':
    'You are about to trigger the workflow to activate tenant <strong>{0}</strong> to use Azure public services. Please click the below button to proceed.',
  'tenant.status': 'Tenant Status',
  'tenant.activateTenant': 'Activate Tenant',
  'tenant.activateTenantDesc':
    'The onboard for tenant <strong>{0}</strong> has been completed. The tenant will be automatically activated in a short while.',
  'tenant.checkOnboard': 'Checking Onboard Status...',
  'tenant.createTenant': 'Create Tenant',
  'tenant.createTenantDesc':
    'The onboard for tenant <strong>{0}</strong> has started. Azure is creating a corresponding B2C tenant for it. This step may take minutes to hours to complete.',
  'tenant.selectSubscription': 'Select Subscription',
  'tenant.selectSubscriptionTitle':
    'Please select an Azure subscription for tenant <strong>{0}</strong>. Azure resource provisioning and billing for the tenant will be applied to the specific subscription.',
  'tenant.transferSubscription': 'Transfer Subscription',
  'tenant.transferSubscriptionDesc':
    'The subscription is assigned to tenant <strong>{0}</strong>. Please confirm the subscription transfer step by step. The transfer may take minutes to hours to complete.',
  'tenant.subscriptions': 'Subscriptions',
  'tenant.unsubscribeTip':
    "To finish resetting the tenant, please click below link and change directory back to the home directory. It usually takes more than 10 minutes to take effect after transferring subscription back in the Azure portal. <br /><a href={0} target='_blank'>{0}</a>",
  'tenant.activateTitle': 'Activate Tenant',
  'tenant.deactivateTitle': 'Deactivate Tenant',
  'tenant.resetTitle': 'Reset Tenant',
  'tenant.activateContent': 'Please confirm if you want to activate tenant <strong>{0}</strong>.',
  'tenant.deactivateContent': 'Please confirm if you want to deactivate tenant <strong>{0}</strong>.',
  'tenant.resetContent':
    'Please confirm if you want to reset tenant <strong>{0}</strong>. You may need to go to Azure portal and transfer subscription back to the home directory.',
  'tenant.dragAndDropClue': 'You can drag and drop services here',
  'tenant.manageServices': 'Manage Services',
  'tenant.provisionedServices': 'Provisioned Services',
  'tenant.unavailableServices': 'Services Available for Provisioning',
  'tenant.failToUpdateService': 'Failed to update service. Service list will roll back.',
};

const platform = {
  'platform.status': 'Platform Status',
  'platform.platform': 'Platform',
};

const cloudServices = {
  'cloudServices.title': 'Cloud Services',
  'cloudServices.noServicesFound': 'No services found',
  'cloudService.openPortal': 'Open Portal',
};

export const ENGLISH = {
  ...common,
  ...auth,
  ...cloudConnection,
  ...tenant,
  ...platform,
  ...cloudServices,
};
