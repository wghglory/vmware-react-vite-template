import {CdsAlert} from '@cds/react/alert';
import {CdsButton} from '@cds/react/button';

import {l10n} from '@/i18n/i18nUtils';

import AppModal from './AppModal';

export default function ConfirmDialog({
  visible,
  title,
  cancel,
  confirm,
  isLoading,
  error,
  disabled,
  children,
}: {
  visible: boolean;
  title: string;
  cancel: () => void;
  confirm: () => void;
  isLoading: boolean;
  error: Error | null;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <AppModal
      visible={visible}
      closeChange={cancel}
      title={title}
      footer={
        <div className="space-x-4">
          <CdsButton type="button" action="outline" onClick={cancel}>
            {l10n('common.cancel')}
          </CdsButton>
          <CdsButton
            status="danger"
            onClick={confirm}
            loadingState={isLoading ? 'loading' : 'default'}
            disabled={disabled}
          >
            {l10n('common.confirm')}
          </CdsButton>
        </div>
      }
    >
      {children}
      {error && <CdsAlert>{error.message}</CdsAlert>}
    </AppModal>
  );
}
