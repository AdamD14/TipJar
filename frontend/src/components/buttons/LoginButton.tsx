import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link
      href="/login"
      className="px-6 py-3 rounded-full border border-[#063250] text-[#063250] font-semibold hover:bg-[#063250]/10 hover:shadow-[0_0_10px_#063250] transition-all duration-300"
    >
      Login
    </Link>
  );
};

