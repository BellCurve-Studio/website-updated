import { cn } from "@/lib/utils";

export function StudioWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col font-heading leading-[0.85] tracking-[-0.02em]", className)}>
      <span className="text-[26px]">BellCurve</span>
      <span className="mt-1 font-sans text-[9px] leading-none font-bold tracking-[0.32em] uppercase">Studios</span>
    </span>
  );
}
