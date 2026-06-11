import { StatusBadge } from '../../../components/status/StatusBadge';

const cards = [
  { title: 'Jobs awaiting approval', value: '3', status: 'ACTION' },
  { title: 'Vehicles ready for collection', value: '2', status: 'READY' },
  { title: 'Parts waiting', value: '4', status: 'BLOCKED' },
];

export function DashboardPanel() {
  return (
    <div className=" rounded-xl bg-gradient-to-bl from-[#08101c] via-[#0f1f53] to-[#0d1728] p-8">
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-4">
        {cards.map((card) => (
          <div key={card.title} className="rounded-xl border border-[#3B82F6] font-extrabold border-opacity-45 p-4 bg-gradient-to-r from-[#2563eb] to-[#38bdf8] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between">
              {/*<strong className="font-bold text-[18px]">{card.title}</strong> With Black text*/}
              <strong className="font-semibold text-[16px] text-slate-200 tracking-wide">{card.title}</strong>
              <StatusBadge value={card.status} />
            </div>
            {/*<div className="mt-4 text-[30px] font-extrabold text-[#DBEAFE]">{card.value}</div>*/}
            <div className="mt-5 text-[32px] font-bold text-white tracking-tight">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
