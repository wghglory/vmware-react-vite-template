import {CdsProgressCircle} from '@cds/react/progress-circle';

export default function DatagridLoading() {
  return (
    <div className="flex gap-4 justify-center items-center h-full w-full min-h-[200px] dark:bg-gray-800 dark:text-gray-100">
      <CdsProgressCircle size="xxl" status="info"></CdsProgressCircle>
      Loading...
    </div>
  );
}
