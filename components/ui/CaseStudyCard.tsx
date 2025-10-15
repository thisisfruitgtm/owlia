import Link from "next/link";

interface CaseStudyCardProps {
  title: string;
  industry: string;
  metric: string;
  description: string;
  image?: string;
  slug: string;
}

export default function CaseStudyCard({
  title,
  industry,
  metric,
  description,
  image,
  slug,
}: CaseStudyCardProps) {
  return (
    <Link href={`/cazuri-de-succes/${slug}`}>
      <div className="bg-white rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-smooth group">
        {image && (
          <div className="h-64 bg-cream flex items-center justify-center">
            <span className="text-6xl">{image}</span>
          </div>
        )}
        <div className="p-8">
          <div className="text-sm font-semibold text-navy/70 mb-2 uppercase tracking-wide">
            {industry}
          </div>
          <h3 className="text-2xl font-bold text-navy mb-3 group-hover:underline">
            {title}
          </h3>
          <div className="text-3xl font-bold text-navy mb-4">{metric}</div>
          <p className="text-gray leading-relaxed mb-6">{description}</p>
          <div className="inline-flex items-center gap-2 text-navy font-semibold group-hover:gap-3 transition-all">
            Vezi cazul complet
            <span className="text-xl">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

