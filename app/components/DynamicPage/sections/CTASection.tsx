import React from 'react';
import { CTASectionData } from '../types';

interface CTASectionProps {
  data: CTASectionData;
  isPreview?: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({ data, isPreview = false }) => {
  const { title, description, buttonText, buttonLink } = data;

  return (
    <section className="bg-blue-600 text-white">
      <div className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        {description && (
          <p className="text-xl mb-8 text-blue-100">{description}</p>
        )}
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  );
};

export default CTASection;
