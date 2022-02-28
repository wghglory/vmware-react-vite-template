import {RefObject, useRef} from 'react';
import {Toaster} from 'react-hot-toast';
import {Outlet} from 'react-router';

import TheNav from './TheNav';

export default function Layout() {
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-300">
        <TheNav />
        {/* <main className="mt-[64px] flex-1 overflow-auto" ref={containerRef} onScroll={scroll}> */}
        <main className="mt-[64px] flex-1 overflow-auto">
          <Outlet />
        </main>

        <Toaster />
      </div>
    </>
  );
}
