import {CdsProgressCircle} from '@cds/react/progress-circle';

export default function DatagridLoading() {
  return (
    <div className="flex h-full min-h-[200px] w-full items-center justify-center gap-4 dark:bg-gray-800 dark:text-gray-100">
      <CdsProgressCircle size="xxl" status="info"></CdsProgressCircle>
      Loading...
    </div>
  );
}
