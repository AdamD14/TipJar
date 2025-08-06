interface TestimonialBlockProps {
  quote: string;
  author: string;
}

const TestimonialBlock = ({ quote, author }: TestimonialBlockProps) => (
  <div className="max-w-2xl mx-auto text-center space-y-4 fade-in">
    <p className="text-lg italic">"{quote}"</p>
    <span className="block font-semibold text-[#ffd700]">{author}</span>
  </div>
);

export default TestimonialBlock;
