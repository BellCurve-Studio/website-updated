import Image from "next/image";
import { cn } from "@/lib/utils";

interface StudioCtaProps {
  children: React.ReactNode;
  className?: string;
}

export function StudioCta({ children, className }: StudioCtaProps) {
  return (
    <a
      href="https://cal.com/byhuy/project-intro-call"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "studio-cta inline-flex w-fit items-center gap-3 rounded-xs bg-[#f0f0eb] p-1.5 pl-3 text-base font-bold tracking-tight text-[#141414] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-[#f0f0eb]",
        className,
      )}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-xs bg-[#141414]">
        <Image
          src="/assets/SVG/g_btn_svg.svg"
          alt=""
          width={24}
          height={24}
          className="studio-cta-arrow size-6 invert"
        />
      </span>
    </a>
  );
}
