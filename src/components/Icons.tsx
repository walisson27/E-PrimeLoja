import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function IconBase({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function Menu(props: IconProps) {
  return <IconBase {...props}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></IconBase>;
}

export function X(props: IconProps) {
  return <IconBase {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></IconBase>;
}

export function ShoppingBag(props: IconProps) {
  return <IconBase {...props}><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></IconBase>;
}

export function ShoppingCart(props: IconProps) {
  return <IconBase {...props}><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /><path d="M2 3h3l3 12h10l3-8H6" /></IconBase>;
}

export function UserRound(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></IconBase>;
}

export function PackagePlus(props: IconProps) {
  return <IconBase {...props}><path d="m12 3 8 4-8 4-8-4 8-4Z" /><path d="M4 7v10l8 4 8-4V7" /><path d="M12 11v10" /><path d="M16 14h-4" /><path d="M14 12v4" /></IconBase>;
}

export function Moon(props: IconProps) {
  return <IconBase {...props}><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8Z" /></IconBase>;
}

export function Sun(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></IconBase>;
}

export function Trash2(props: IconProps) {
  return <IconBase {...props}><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="m19 6-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></IconBase>;
}

export function MapPin(props: IconProps) {
  return <IconBase {...props}><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></IconBase>;
}

export function LogIn(props: IconProps) {
  return <IconBase {...props}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /></IconBase>;
}

export function UserPlus(props: IconProps) {
  return <IconBase {...props}><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0" /><path d="M19 8v6" /><path d="M22 11h-6" /></IconBase>;
}

export function ArrowRight(props: IconProps) {
  return <IconBase {...props}><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></IconBase>;
}

export function ArrowLeft(props: IconProps) {
  return <IconBase {...props}><path d="M19 12H5" /><path d="m11 19-7-7 7-7" /></IconBase>;
}

export function Search(props: IconProps) {
  return <IconBase {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></IconBase>;
}

export function Sparkles(props: IconProps) {
  return <IconBase {...props}><path d="M12 3 10 9l-6 2 6 2 2 6 2-6 6-2-6-2-2-6Z" /><path d="M19 3v4" /><path d="M21 5h-4" /></IconBase>;
}

export function ShieldCheck(props: IconProps) {
  return <IconBase {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></IconBase>;
}

export function Truck(props: IconProps) {
  return <IconBase {...props}><path d="M3 7h11v10H3V7Z" /><path d="M14 10h4l3 3v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></IconBase>;
}
