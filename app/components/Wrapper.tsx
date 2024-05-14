export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden p-8 bg-white/10 backdrop-blur rounded-2xl border border-white min-h-10 max-w-lg">
      {children}
    </div>
  );
}
