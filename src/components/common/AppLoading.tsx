import {CdsProgressCircle} from '@cds/react/progress-circle';

export default function AppLoading() {
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <CdsProgressCircle size="xxl" status="info"></CdsProgressCircle>
      Loading...
    </div>
  );
}
