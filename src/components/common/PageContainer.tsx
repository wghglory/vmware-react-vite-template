export default function PageContainer({children, title}: {children: React.ReactNode; title: React.ReactNode}) {
  return (
    <div className="container mx-auto py-10 px-6">
      <h2 className="mb-8 text-3xl">{title}</h2>
      {children}
    </div>
  );
}
