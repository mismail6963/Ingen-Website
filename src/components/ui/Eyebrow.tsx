/** Section label: vermilion Ingen icon followed by a short word. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`m-0 flex items-center gap-2.5 text-small ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny brand SVG, no optimisation needed */}
      <img src="/brand/Ingen-Icon-Vermilion.svg" alt="" width={12} height={12} className="block size-3" />
      {children}
    </p>
  );
}
