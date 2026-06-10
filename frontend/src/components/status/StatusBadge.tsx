export function StatusBadge({ value }: { value: string }) {
  return (
    <span
      className="inline-block px-[10px] py-1 rounded-full border border-[#d0d7de] text-[12px] font-semibold bg-[#f6f8fa]"
    >
      {value}
    </span>
  );
}
