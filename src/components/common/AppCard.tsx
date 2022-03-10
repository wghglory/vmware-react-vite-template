export default function AppCard({
  checked,
  children,
  className,
}: {
  checked: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${className} border-2 bg-white p-8 shadow dark:bg-gray-800 ${
        checked ? 'border-green-500' : 'border-transparent'
      }`}
    >
      {children}
    </div>
  );
}
