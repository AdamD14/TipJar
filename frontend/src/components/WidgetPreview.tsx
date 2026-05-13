import Card from "@/components/ui/Card";

export default function WidgetPreview({
  handle,
  style,
}: {
  handle: string;
  style: "button" | "slider";
}) {
  return (
    <Card>
      <p className="font-body text-text-ds-primary">
        Widget preview for <strong>@{handle}</strong>
      </p>
      <p className="font-body text-sm text-text-ds-tertiary mt-1">
        Style: {style}
      </p>
    </Card>
  );
}
