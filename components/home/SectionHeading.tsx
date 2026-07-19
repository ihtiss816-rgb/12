export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-red">{eyebrow}</div>
      )}
      <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-pretty text-lg text-brand-gray ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
