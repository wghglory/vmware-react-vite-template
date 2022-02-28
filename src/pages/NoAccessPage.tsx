import {ReactComponent as NoAccessSvg} from '@/assets/access-denied.svg';

export default function NoAccessPage() {
  return (
    <div className="container mx-auto flex flex-col text-center p-12" aria-label="You don't have access">
      <NoAccessSvg className="h-56 sm:h-96 w-auto text-gray-50 dark:text-gray-900" />
      <h1 className="py-8 text-lg">Sorry, you do not have access to this service.</h1>
    </div>
  );
}
