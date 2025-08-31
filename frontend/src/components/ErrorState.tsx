export default function ErrorState({ message = "Something went wrong." }: { message?: string }) {
  return <div className="p-6 text-center text-red-400">{message}</div>;
}
