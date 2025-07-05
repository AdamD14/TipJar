import HoverSliderWidget from './HoverSliderWidget';

interface WidgetPreviewProps {
  handle: string;
  style?: 'button' | 'slider';
}

export default function WidgetPreview({ handle, style = 'button' }: WidgetPreviewProps) {
  if (style === 'slider') {
    return <HoverSliderWidget handle={handle} />;
  }

  return (
    <button className="bg-[#006D6D] text-white px-4 py-2 rounded">
      💸 Wesprzyj {handle}
    </button>
  );
}
