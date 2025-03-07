export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-prose mx-auto">
      {children}
    </div>
  );
}