export default function AppCard({checked, children}: {checked: boolean; children: React.ReactNode}) {
  return (
    <div
      className={`border-2 bg-white p-8 shadow dark:bg-gray-800 ${checked ? 'border-green-500' : 'border-transparent'}`}
    >
      {children}
    </div>
  );
}
