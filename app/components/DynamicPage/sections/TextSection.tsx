import React from 'react';
import { TextSectionData } from '../types';

interface TextSectionProps {
  data: TextSectionData;
  isPreview?: boolean;
  isInCombinedLayout?: boolean; // New prop to indicate if it's in a side-by-side layout
}

const TextSection: React.FC<TextSectionProps> = ({
  data,
  isPreview = false,
  isInCombinedLayout = false,
}) => {
  const { title, content } = data;

  // Different layout for combined vs standalone
  if (isInCombinedLayout) {
    return (
      <div>
        {title && <h2 className="text-3xl font-bold mb-6">{title}</h2>}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  }

  return (
    <section>
      {title && <h2 className="text-3xl font-bold mb-6">{title}</h2>}
      <div
        className="prose prose-lg max-w-prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};

export default TextSection;
