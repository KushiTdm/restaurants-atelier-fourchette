import type { MenuItem } from '../data';

export default function MenuColumn({
  title,
  items,
  className = '',
}: {
  title: string;
  items: MenuItem[];
  className?: string;
}) {
  return (
    <div className={`flex-1 menu-column ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <span className="divider-line" />
        <h3 className="font-serif text-sm font-medium tracking-[0.15em] uppercase text-bark-900 whitespace-nowrap">
          {title}
        </h3>
        <span className="divider-line" />
      </div>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.name} className="flex justify-between gap-4">
            <div>
              <p className="font-serif font-medium text-bark-900 text-[15px]">{item.name}</p>
              <p className="font-sans text-bark-700 text-sm mt-0.5 leading-relaxed whitespace-pre-line opacity-70">
                {item.desc}
              </p>
            </div>
            <span className="font-serif text-terracotta-500 font-medium text-[15px] flex-shrink-0">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
