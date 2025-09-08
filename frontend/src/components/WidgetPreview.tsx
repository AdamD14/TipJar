export default function WidgetPreview({
  handle,
  style,
}: {
  handle: string;
  style: 'button' | 'slider';
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-[#DDE0DA]">
      <p>
        Widget preview for <strong>@{handle}</strong>
      </p>
      <p className="text-sm text-[#BCC1B6]">Style: {style}</p>
    </div>
  );
}
