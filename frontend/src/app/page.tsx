// app/page.tsx
'use client';

import { useState, useEffect, type ReactNode, type CSSProperties } from 'react';
import {
  QrCode,
  Star,
  Heart,
  Zap,
  Globe,
  Shield,
  Coins,
  Copy,
  Check,
  Menu,
  X,
  ChevronDown,
  PlayCircle,
  type LucideIcon
} from 'lucide-react';

interface PaymentIconProps {
  children: ReactNode;
  name: string;
}

const PaymentIcon = ({ children, name }: PaymentIconProps) => (
  <div
    title={name}
    className="w-full h-full bg-white bg-opacity-10 rounded-lg flex items-center justify-center text-white hover:scale-110 hover:bg-opacity-20 transition-all duration-300 cursor-pointer"
    style={{ minHeight: 0, minWidth: 0, padding: 0, margin: 0 }}
  >
    {children}
  </div>
);

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) => (
  <div
    className="bg-gradient-to-br from-[#123647] to-[#0a2836] p-6 rounded-xl text-center text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20 group relative overflow-hidden"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <Icon className="w-12 h-12 mx-auto mb-4 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
      <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors duration-300">{title}</h3>
      <p className="text-[#b0c4de] group-hover:text-white transition-colors duration-300">{description}</p>
    </div>
  </div>
);

interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

const AnimatedCounter = ({ value, duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= value) {
          clearInterval(timer);
          return value;
        }
        return Math.min(prev + increment, value);
      });
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{Math.round(count)}</span>;
};

interface FloatingElementProps {
  className: string;
  delay?: number;
  duration?: number;
}

const FloatingElement = ({
  className,
  delay = 0,
  duration = 3000,
}: FloatingElementProps) => (
  <div
    className={`absolute ${className} animate-pulse`}
    style={{
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
    }}
  >
    <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-60" />
  </div>
);

export default function LandingPage() {
  const [tipAmount, setTipAmount] = useState<number>(10);
  const [isCopied, setIsCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCopy = () => {
    const textToCopy = 'tipjar.plus/@AdamDuda';
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const sliderPercentage = (tipAmount / 20) * 100;
  const sliderBackground: CSSProperties = {
    background: `linear-gradient(to right, #FFD700 ${sliderPercentage}%, rgba(255, 255, 255, 0.1) ${sliderPercentage}%)`,
  };

  const features: FeatureCardProps[] = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Instant payments with no delays. Your earnings arrive immediately in your wallet.',
    },
    {
      icon: Shield,
      title: 'Secure & Transparent',
      description:
        'Built on Web3 technology with USDC stablecoin. Fully regulated and transparent.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description:
        'Accept payments from anywhere in the world. Support for 80+ currencies.',
    },
    {
      icon: Coins,
      title: 'Low Fees',
      description:
        'Just 5% service fee. Keep more of what you earn with direct payouts.',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#0a1b2e] via-[#0d2f3f] to-[#1a365d] text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingElement className="top-1/4 left-1/4" delay={0} />
        <FloatingElement className="top-1/3 right-1/4" delay={1000} />
        <FloatingElement className="bottom-1/4 left-1/3" delay={2000} />
        <FloatingElement className="bottom-1/3 right-1/3" delay={3000} />
      </div>

      {/* Dynamic cursor glow */}
      <div
        className="fixed pointer-events-none z-0 w-32 h-32 rounded-full bg-yellow-400/10 blur-2xl transition-all duration-300"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
        }}
      />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 transition-all duration-300 ${
          isScrolled ? 'bg-[#0d2f3f]/95 backdrop-blur-md' : 'bg-[#0d2f3f]/30 backdrop-blur-lg'
        }`}
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-gray-900" />
              </div>
              <span className="text-2xl font-bold text-white">tipjar.plus</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Why tipjar+?', 'How it works?', 'Start Building', 'Explore', 'Learn', 'AI Studio'].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/\?/g, '')}`}
                    className="text-white hover:text-yellow-400 transition-colors duration-300 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                  </a>
                ),
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50">
                Begin as a Creator
              </button>
              <button className="border border-white text-white font-bold py-2 px-6 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-yellow-400 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 p-4 bg-[#0f3a4d]/90 rounded-lg border border-white/10">
              <div className="flex flex-col space-y-4">
                {['Why tipjar+?', 'How it works?', 'Start Building', 'Explore', 'Learn', 'AI Studio'].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/\?/g, '')}`}
                      className="text-white hover:text-yellow-400 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ),
                )}
                <button className="bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-all duration-300 mt-4">
                  Begin as a Creator
                </button>
                <button className="border border-white text-white font-bold py-2 px-6 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                  Login
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                    Support Creativity,
                  </span>
                  <br />
                  <span className="text-yellow-400">Get Paid Instantly</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                  Platform for instant micro-payments to your favorite creators: streamers, YouTubers, digital models, musicians, artists, bloggers, coaches, educators, journalists, influencers - simply for all content creators, without high fees.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-400/50">
                  <span className="flex items-center justify-center gap-2">
                    Sign Up as Creator
                    <Star className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </button>
                <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105">
                  Explore Creators
                </button>
                <button className="bg-white/10 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  Sign Up as a Fan
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    <AnimatedCounter value={5} />%
                  </div>
                  <div className="text-sm text-gray-400">Service Fee</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    <AnimatedCounter value={80} />+
                  </div>
                  <div className="text-sm text-gray-400">Currencies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    <AnimatedCounter value={100} />%
                  </div>
                  <div className="text-sm text-gray-400">Secure</div>
                </div>
              </div>
            </div>

            {/* Right Column - Tip Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-[#0f3a4d] to-[#0a2836] rounded-2xl p-6 w-full max-w-sm border border-white/10 shadow-2xl backdrop-blur-sm">
                  {/* Avatar */}
                  <div className="flex justify-center relative -mt-12 mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                      <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">AD</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">@AdamDuda</h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <span>tipjar.plus/@AdamDuda</span>
                      <button
                        onClick={handleCopy}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                      Founder of tipjar+ - built with AI agents. Advocate of freedom, decentralization, and blockchain technology.
                    </p>
                  </div>

                  {/* Slider */}
                  <div className="mb-4">
                    <input
                      type="range"
                      min="0.1"
                      max="20"
                      step="0.1"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(parseFloat(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={sliderBackground}
                    />
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {[1, 2, 5, 10].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setTipAmount(amount)}
                        className={`py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          tipAmount === amount
                            ? 'bg-yellow-400 text-gray-900 shadow-lg'
                            : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {/* Tip Button */}
                  <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-400/50 flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    Tip ${tipAmount.toFixed(2)}
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">USDC</span>
                  </button>

                  {/* Payment Methods */}
                  <div className="mt-4 grid grid-cols-6 gap-1">
                    {['GP', 'AP', 'MM', 'RV', 'WC', 'BK'].map((method, index) => (
                      <PaymentIcon key={index} name={method}>
                        <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs font-bold">
                          {method}
                        </div>
                      </PaymentIcon>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="why-tipjar" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why <span className="text-yellow-400">tipjar+</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The future of creator monetization is here. Fast, secure, and built for the global economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Highlighted Feature */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur opacity-20" />
            <div className="relative bg-gradient-to-br from-[#0f3a4d] to-[#0a2836] p-8 rounded-2xl text-center border border-yellow-400/30">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-yellow-400 mb-6">Direct Creator Support</h3>
                <p className="text-xl text-gray-200 leading-relaxed">
                  With our simple <span className="text-yellow-400 font-bold">5% service fee</span>, creators receive the vast majority of their earnings directly.
                  No intermediaries, no delays, no frozen assets. You earn it, you own it - instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">How it works?</h2>
            <p className="text-xl text-gray-300">Simple steps to start supporting or earning</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Fans */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-yellow-400 text-center mb-8">For Fans</h3>
              <div className="space-y-6">
                {[
                  { title: 'Sign Up (Optional)', desc: "Use email, Google, Twitch, or MetaMask. Registration isn't required to send tips." },
                  { title: 'Fund Your Tips', desc: 'Top up with USDC using crypto or your preferred payment method.' },
                  { title: 'Explore!', desc: 'Discover creators sharing knowledge for the new digital era.' },
                  { title: 'Support!', desc: 'Real people, real value. Support creators you love.' },
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                      <p className="text-gray-300 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* For Creators */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-yellow-400 text-center mb-8">For Creators</h3>
              <div className="space-y-6">
                {[
                  { title: 'Ownership', desc: '100% creator-owned space with customizable profile and branding.' },
                  { title: 'Engagement', desc: 'Goal tracking, subscriptions, and community building tools.' },
                  { title: 'Flexibility', desc: 'One-time tips, fundraising goals, and monthly subscriptions.' },
                  { title: 'Shareability', desc: 'QR codes, widgets, and social integration for maximum reach.' },
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                      <p className="text-gray-300 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build Section */}
      <section id="start-building" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Start Building</h2>
            <p className="text-xl text-gray-300">Tools to create your perfect tipjar+ experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'QR Generator', desc: 'Share your code anywhere', icon: QrCode },
              { title: 'Widget', desc: 'Integrate with your page', icon: PlayCircle },
              { title: 'Customize', desc: 'Personalize your TipJar+', icon: Star },
            ].map((tool, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-[#123647] to-[#0a2836] p-8 rounded-xl text-center border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
                  <tool.icon className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white mb-4">{tool.title}</h3>
                  <p className="text-gray-300">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Studio Section */}
      <section id="ai-studio" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl blur opacity-20" />
            <div className="relative bg-gradient-to-br from-[#0f3a4d] to-[#0a2836] p-12 rounded-2xl text-center border border-purple-400/30">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  🤖 <span className="text-purple-400">AI Studio</span>
                </h2>
                <p className="text-xl text-purple-300 mb-6">
                  This platform is a living experiment in human-AI collaboration.
                </p>
                <p className="text-lg text-gray-200 leading-relaxed">
                  From concept and coding to design and copywriting, this entire project was built by a human founder working in tandem with a team of specialized AI agents. It stands as a testament to the power of combining human vision with artificial intelligence to build functional, modern applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 bg-black/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <Coins className="w-6 h-6 text-gray-900" />
            </div>
            <span className="text-2xl font-bold text-white">tipjar.plus</span>
          </div>
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} TipJar+. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 shadow-lg hover:bg-yellow-300 transition-all duration-300 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <ChevronDown className="w-6 h-6 rotate-180" />
      </button>
    </div>
  );
}

