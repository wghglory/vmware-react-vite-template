import React from 'react';

export default function AppDropdown({children}: {children: React.ReactNode}) {
  return (
    <div className="absolute ml-2 z-10 w-max border dark:border-gray-500 shadow bg-white dark:bg-gray-700 py-4 inline-flex flex-col">
      {children}
      {/* <li>
        <button className="hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 w-full text-left">AppDropdown</button>
      </li>
      <li>
        <button className="hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 w-full text-left">AppDropdown 2</button>
      </li> */}
    </div>
  );
}
