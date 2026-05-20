import AvatarCarousel from "@/components/onboarding/AvatarCarousel";
import { GoalBar } from "@/components/studio/modal/GoalBar";
import WidgetPreview from "@/components/studio/widget/WidgetPreview";
import Card from "@/components/ui/forms/Card";

/* ------------------------------------------------------------------ */

export default function StartBuildingShowcase() {
  const demoGoal = {
    title: "New Studio Setup",
    target: 5000,
    current: 3480,
    deadline: "2025-12-31",
  };

  const demoAvatars = [
    "/ja.webp",
    "/ja2.webp",
    "/ja3.webp",
  ];

  return (
    <section id="studio" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-[length:var(--fs-h1)] font-heading font-bold text-text-ds-primary">
            Start Building
          </h2>
          <p className="mt-3 text-lg text-text-ds-tertiary font-body max-w-2xl mx-auto">
            Your creator profile, your community, your income — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Carousel Showcase */}
          <Card interactive className="col-span-1 flex flex-col items-center justify-center p-6">
            <h3 className="text-lg font-heading font-semibold text-text-ds-primary mb-4 uppercase tracking-wider">
              Avatar System
            </h3>
            <div className="w-full max-w-[320px]">
              <AvatarCarousel avatarUrls={demoAvatars} autoRotate={false} />
            </div>
            <p className="mt-4 text-sm text-text-ds-tertiary font-body text-center">
              Multi-avatar carousel with swipe navigation and auto-fill.
            </p>
          </Card>

          {/* GoalBar Showcase */}
          <Card interactive className="col-span-1 flex flex-col items-center justify-center p-6">
            <h3 className="text-lg font-heading font-semibold text-text-ds-primary mb-4 uppercase tracking-wider">
              Funding Goals
            </h3>
            <GoalBar goal={demoGoal} />
            <p className="mt-4 text-sm text-text-ds-tertiary font-body text-center">
              Track progress, set deadlines, and celebrate milestones.
            </p>
          </Card>

          {/* WidgetPreview Showcase */}
          <Card interactive className="col-span-1 flex flex-col items-center justify-center p-6">
            <h3 className="text-lg font-heading font-semibold text-text-ds-primary mb-4 uppercase tracking-wider">
              Share Widgets
            </h3>
            <WidgetPreview handle="yourname" style="button" />
            <p className="mt-4 text-sm text-text-ds-tertiary font-body text-center">
              Embeddable buttons and sliders for any website or social bio.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
