import Link from "next/link";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <Link href={href}>
      <div className="p-8 bg-cream rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-smooth group">
        <div className="text-5xl mb-6">{icon}</div>
        <h3 className="text-2xl font-bold text-navy mb-3 group-hover:underline">
          {title}
        </h3>
        <p className="text-gray leading-relaxed">{description}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-navy font-semibold group-hover:gap-3 transition-all">
          Află mai mult
          <span className="text-xl">→</span>
        </div>
      </div>
    </Link>
  );
}

