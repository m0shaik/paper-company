import React from 'react';

interface PageHeadingProps {
  title: string;
  description?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title, description }) => {
  return (
    <div className="mb-2">
      <h1 className="text-4xl font-bold mt-4 text-balance">{title}</h1>
      {description && (
        <div
          className="text-lg text-gray-700 max-w-prose"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
};

export default PageHeading;
