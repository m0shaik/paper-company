import React from 'react';
import { FeaturesSectionData } from '../types';

interface FeaturesSectionProps {
  data: FeaturesSectionData;
  isPreview?: boolean;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  data,
  isPreview = false,
}) => {
  const { title, description, features } = data;

  return (
    <section>
      {title && <h2 className="text-3xl font-bold mb-6">{title}</h2>}
      {description && (
        <p className="text-lg text-gray-700 mb-12">{description}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md border">
            {feature.icon && (
              <div className="text-4xl mb-4">{feature.icon}</div>
            )}
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
