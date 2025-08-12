/* eslint-disable @next/next/no-img-element */
export interface Fan {
  id: string;
  avatarUrl: string;
  amount: number;
  timeAgo: string;
}

export function FanWall({ fans }: { fans: Fan[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {fans.map((fan) => (
        <div key={fan.id} className="relative">
          <img src={fan.avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
          <span className="absolute -bottom-1 -right-1 rounded-full bg-[#6B46C1] px-1 text-[10px] text-white">
            {fan.amount}
          </span>
        </div>
      ))}
    </div>
  );
}
