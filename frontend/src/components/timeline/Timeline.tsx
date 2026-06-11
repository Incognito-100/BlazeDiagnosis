interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
}

export function Timeline({ items = [] }: { items?: TimelineItem[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item.id} className="border-l-[3px] border-[#d0d7de] pl-3">
          <strong>{item.title}</strong>
          {item.subtitle ? <div className="text-[#555]">{item.subtitle}</div> : null}
        </div>
      ))}
    </div>
  );
}
