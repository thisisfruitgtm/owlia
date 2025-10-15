export default function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo_owlia_blue.svg"
      alt="OWLIA - Marketing Non Stop pentru afaceri noi"
      className={className || "h-[80px] w-auto"}
    />
  );
}

