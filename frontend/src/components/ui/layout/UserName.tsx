import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";

interface UserNameProps {
  username: string;
}

export default function UserName({ username }: UserNameProps) {
  return (
    <Slot className="h-auto p-3 -m-3 group transition-all duration-200 active:scale-95 active:translate-y-0.5 hover:bg-transparent hover:border-[1px] hover:border-transparent hover:rounded-sm hover:[border-image-slice:1] hover:[border-image:linear-gradient(to_right,#fcf51d,var(--color-gold-400),#ffa01a)_1]">
      <Link href={`/@${username}`}>
        <span className="text-[13px] md:text-sm font-semibold font-body bg-gradient-to-r from-gold-400 via-[#ffa01a] to-[#fcf51d] bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-200">
          @{username}
        </span>
      </Link>
    </Slot>
  );
}