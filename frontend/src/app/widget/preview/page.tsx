'use client';
import { useSearchParams } from 'next/navigation';
import WidgetPreview from '@/components/WidgetPreview';

export default function WidgetPreviewPage() {
  const searchParams = useSearchParams();
  const handle = searchParams.get('handle') || 'me';
  const styleParam = searchParams.get('style') as 'button' | 'slider' | null;

  return (
    <div className="flex items-center justify-center h-full p-4">
      <WidgetPreview handle={handle} style={styleParam || 'button'} />
    </div>
  );
}
