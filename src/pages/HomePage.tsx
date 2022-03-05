import {Link} from 'react-router-dom';

import {RoutePath} from '@/core/const/routePath';
import {useAuth} from '@/core/context/AuthContext';
import {l10n} from '@/i18n/i18nUtils';

const HomePage = () => {
  const {user} = useAuth();

  return (
    <div className="flex h-full flex-col sm:overflow-hidden">
      <div className="font-montserrat container mx-auto flex flex-col sm:flex-row sm:items-center sm:p-12 lg:p-20">
        <div className="m-8 flex flex-col items-center sm:m-12 sm:w-2/5 sm:items-start">
          <h1 className="mb-4 text-4xl leading-none lg:text-6xl">
            <strong className="invisible font-black sm:visible">{l10n('common.product')}</strong>
            <br />
            {l10n('common.productSubtitle')}
          </h1>
          <p className="mb-4 sm:mb-12 lg:text-lg">{l10n('common.productDesc')}</p>
          {!user && (
            <Link
              to={RoutePath.signIn}
              className="rounded-md bg-sky-600 py-3 px-10 text-xs font-semibold text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-gray-100 hover:dark:bg-sky-600 sm:text-lg"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
