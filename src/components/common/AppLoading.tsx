import {CdsProgressCircle} from '@cds/react/progress-circle';

export default function AppLoading({text}: {text?: string}) {
  return (
    <div className="flex h-full items-center justify-center gap-4 p-4">
      <CdsProgressCircle size="xxl" status="info"></CdsProgressCircle>
      Loading {text} ...
    </div>
  );
}
