import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="p-6 bg-[#400070] rounded-lg text-center slide-up-fade">
    {icon && <div className="mb-4 text-[#ffd700]">{icon}</div>}
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm opacity-80">{description}</p>
  </div>
);

export default FeatureCard;
