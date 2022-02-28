import {CdsProgressCircle} from '@cds/react/progress-circle';

export default function AppLoading() {
  return (
    <div className="flex gap-4 justify-center items-center h-full">
      <CdsProgressCircle size="xxl" status="info"></CdsProgressCircle>
      Loading...
    </div>
  );
}
