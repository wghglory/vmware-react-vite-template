import {CdsAlert, CdsAlertGroup} from '@cds/react/alert';
import {CdsButton} from '@cds/react/button';
import {CdsFormGroup} from '@cds/react/forms';
import {CdsInput} from '@cds/react/input';
import {FormEvent, useState} from 'react';

import {useAuth} from '@/context/AuthContext';
import {l10n} from '@/i18n/i18nUtils';

import style from './SignInPage.module.css';

export default function SignInPage() {
  // const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {signIn, signOut, error, status} = useAuth();

  function submit(e: FormEvent) {
    e.preventDefault();
    signIn({username, password});
  }

  return (
    <div className={style.loginWrapper}>
      <div className={style.login}>
        <h1 cds-text="title" className={`${style.title} mb-8`}>
          {l10n('common.product')}
        </h1>
        {/* <h2>{l10n('login.subtitle')}</h2> */}
        <form className={style.loginGroup} onSubmit={submit}>
          <CdsFormGroup layout="vertical">
            <CdsInput layout="vertical">
              <label style={{visibility: 'hidden'}}>{l10n('auth.token')}</label>
              <input
                placeholder={l10n('auth.username')}
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              {/* '@cds/react/forms': <CdsControlMessage status='error'>error message</CdsControlMessage> */}
            </CdsInput>
            <CdsInput layout="vertical">
              <label style={{visibility: 'hidden'}}>{l10n('auth.token')}</label>
              <input
                placeholder={l10n('auth.password')}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {/* '@cds/react/forms': <CdsControlMessage status='error'>error message</CdsControlMessage> */}
            </CdsInput>
          </CdsFormGroup>

          {error && (
            <CdsAlertGroup status="danger" className="mt-6" aria-label="This is an example info alert group">
              <CdsAlert closable={true} onCloseChange={() => signOut()}>
                {error.message}
              </CdsAlert>
            </CdsAlertGroup>
          )}

          <CdsButton
            className="mt-6"
            disabled={status === 'loading' || username === '' || password === ''}
            loadingState={status === 'loading' ? 'loading' : 'default'}
            type="submit"
          >
            {l10n('auth.login')}
          </CdsButton>
        </form>
      </div>
    </div>
  );
}
