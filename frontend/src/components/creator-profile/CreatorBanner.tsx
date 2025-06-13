interface Props { bannerUrl?: string }
export const CreatorBanner = ({ bannerUrl }: Props) => (
  <div className="h-48 w-full bg-center bg-cover" style={{ backgroundImage: bannerUrl ? `url(${bannerUrl})` : undefined }} />
);
