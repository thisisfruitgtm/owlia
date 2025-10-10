import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  variant?: "default" | "dark";
}

export default function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
  variant = "default",
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`py-24 text-center ${
        isDark ? "bg-navy text-white" : "bg-white text-navy"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className={`text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-navy"}`}>
          {title}
        </h2>
        <p className={`text-xl mb-10 ${isDark ? "text-white/90" : "text-gray"}`}>
          {description}
        </p>
        <Link
          href={buttonHref}
          className={`inline-flex items-center gap-3 px-12 py-6 rounded-xl font-semibold text-xl hover:-translate-y-1 hover:shadow-2xl transition-smooth ${
            isDark
              ? "bg-white text-navy"
              : "bg-navy text-white"
          }`}
        >
          <span>💬</span>
          {buttonText}
        </Link>
      </div>
    </section>
  );
}

