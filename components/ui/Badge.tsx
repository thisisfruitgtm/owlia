interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "default";
  size?: "sm" | "md";
  className?: string;
}

const variantClasses = {
  success: "bg-green-100 text-green-600",
  warning: "bg-yellow-100 text-yellow-600",
  error: "bg-red-100 text-red-600",
  info: "bg-blue-100 text-blue-600",
  default: "bg-gray-100 text-gray-600",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold ${
        variantClasses[variant]
      } ${size === "sm" ? "text-xs" : "text-sm"} ${className}`}
    >
      {children}
    </span>
  );
}

