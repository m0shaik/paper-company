import React from 'react';
import { TestimonialsSectionData } from '../types';

interface TestimonialsSectionProps {
  data: TestimonialsSectionData;
  isPreview?: boolean;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  data,
  isPreview = false,
}) => {
  const { title, testimonials } = data;

  return (
    <section>
      {title && <h2 className="text-3xl font-bold mb-12">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
            <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
            <div className="flex items-center">
              {testimonial.avatar && (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                {testimonial.role && (
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
