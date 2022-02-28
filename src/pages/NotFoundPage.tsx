import {Link} from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div
      aria-labelledby="pageTitle"
      className="h-full flex items-center justify-center bg-gray-100 dark:bg-dark dark:text-light"
    >
      <div className="p-4">
        <div className="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">
          <p className="font-semibold text-red-500 text-9xl dark:text-red-600">404</p>
          <div className="space-y-2">
            <h1 id="pageTitle" className="flex items-center space-x-2">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-red-500 dark:text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span className="text-xl font-medium text-gray-600 sm:text-2xl dark:text-light">
                Oops! Page not found.
              </span>
            </h1>
            <p className="text-base font-normal text-gray-600 dark:text-gray-300">
              The page you ara looking for was not found.
            </p>
            <p className="text-base font-normal text-gray-600 dark:text-gray-300">
              You may return to{' '}
              <Link to="/" className="text-blue-600 hover:underline dark:text-blue-500">
                home page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
