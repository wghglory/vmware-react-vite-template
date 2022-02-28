import {Link} from 'react-router-dom';

import {useAuth} from '@/context/AuthContext';
import {l10n} from '@/i18n/i18nUtils';

const HomePage = () => {
  const {user} = useAuth();

  return (
    <div className="h-full flex flex-col sm:overflow-hidden">
      <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:p-12 lg:p-20 font-montserrat">
        <div className="sm:w-2/5 flex flex-col items-center sm:items-start m-8 sm:m-12">
          <h1 className="text-4xl lg:text-6xl leading-none mb-4">
            <strong className="font-black invisible sm:visible">{l10n('common.product')}</strong>
            <br />
            {l10n('common.productSubtitle')}
          </h1>
          <p className="lg:text-lg mb-4 sm:mb-12">{l10n('common.productDesc')}</p>
          {!user && (
            <Link
              to={'/sign-in'}
              className="font-semibold text-xs sm:text-lg bg-sky-600 hover:bg-sky-500 dark:bg-sky-500 hover:dark:bg-sky-600 text-white dark:text-gray-100 py-3 px-10 rounded-md"
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
