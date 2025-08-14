import React from 'react';
import { SectionData } from './types';
import PageHeading from './PageHeading';
import TextSection from './sections/TextSection';
import ImageSection from './sections/ImageSection';
import GallerySection from './sections/GallerySection';
import TestimonialsSection from './sections/TestimonialsSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import CTASection from './sections/CTASection';
import FeaturesSection from './sections/FeaturesSection';

interface SectionRendererProps {
  sections: SectionData[];
  pageTitle?: string;
  pageDescription?: string;
  isPreview?: boolean;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
  pageTitle,
  pageDescription,
  isPreview = false,
}) => {
  const renderSection = (section: SectionData) => {
    // Determine container width based on section type
    const getContainerClass = (sectionType: string) => {
      switch (sectionType) {
        case 'gallery':
        case 'testimonials':
        case 'features':
          return 'max-w-7xl'; // Wider for grid layouts
        case 'text':
          return 'max-w-7xl'; // Wider for grid layouts
        case 'cta':
          return 'max-w-4xl'; // Standard width for CTA
        default:
          return 'max-w-4xl'; // Standard width for text, image, faq, contact
      }
    };

    const containerClass = getContainerClass(section.type);

    // Render section content without container styling
    let sectionContent;
    switch (section.type) {
      case 'text':
        sectionContent = (
          <TextSection key={section.id} data={section} isPreview={isPreview} />
        );
        break;

      case 'image':
        sectionContent = (
          <ImageSection key={section.id} data={section} isPreview={isPreview} />
        );
        break;

      case 'gallery':
        sectionContent = (
          <GallerySection
            key={section.id}
            data={section}
            isPreview={isPreview}
          />
        );
        break;

      case 'testimonials':
        sectionContent = (
          <TestimonialsSection
            key={section.id}
            data={section}
            isPreview={isPreview}
          />
        );
        break;

      case 'faq':
        sectionContent = (
          <FAQSection key={section.id} data={section} isPreview={isPreview} />
        );
        break;

      case 'contact':
        sectionContent = (
          <ContactSection
            key={section.id}
            data={section}
            isPreview={isPreview}
          />
        );
        break;

      case 'cta':
        sectionContent = (
          <CTASection key={section.id} data={section} isPreview={isPreview} />
        );
        break;

      case 'features':
        sectionContent = (
          <FeaturesSection
            key={section.id}
            data={section}
            isPreview={isPreview}
          />
        );
        break;

      default:
        if (isPreview) {
          sectionContent = (
            <div
              key={(section as any).id}
              className="p-4 border-2 border-dashed border-red-300 bg-red-50"
            >
              <p className="text-red-600 font-medium">
                Unknown section type: {(section as any).type}
              </p>
              <pre className="text-xs mt-2 overflow-auto">
                {JSON.stringify(section, null, 2)}
              </pre>
            </div>
          );
        } else {
          console.warn(`Unknown section type: ${(section as any).type}`);
          return null;
        }
    }

    // Wrap in container with consistent spacing, except for CTA which handles its own background
    if (section.type === 'cta') {
      return (
        <div key={section.id} className="py-12">
          {sectionContent}
        </div>
      );
    }

    return (
      <div
        key={section.id}
        className={`py-12 mx-auto ${containerClass} px-4 sm:px-6 lg:px-8`}
      >
        {sectionContent}
      </div>
    );
  };

  // Function to render sections with special handling for image+text combinations
  const renderSections = () => {
    const renderedSections = [];
    let i = 0;

    while (i < sections.length) {
      const currentSection = sections[i];
      const nextSection = sections[i + 1];

      // Check if current section is image and next is text (image left, text right)
      if (
        currentSection.type === 'image' &&
        nextSection &&
        nextSection.type === 'text'
      ) {
        // Render image + text side by side
        renderedSections.push(
          <div
            key={`combined-${currentSection.id}-${nextSection.id}`}
            className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image on the left */}
              <div className="order-1 lg:order-1">
                <ImageSection
                  data={currentSection}
                  isPreview={isPreview}
                  isInCombinedLayout={true}
                />
              </div>
              {/* Text on the right */}
              <div className="order-2 lg:order-2">
                <TextSection
                  data={nextSection}
                  isPreview={isPreview}
                  isInCombinedLayout={true}
                />
              </div>
            </div>
          </div>
        );
        i += 2; // Skip both sections as we've rendered them together
      }
      // Check if current section is text and next is image (text left, image right)
      else if (
        currentSection.type === 'text' &&
        nextSection &&
        nextSection.type === 'image'
      ) {
        // Render text + image side by side
        renderedSections.push(
          <div
            key={`combined-${currentSection.id}-${nextSection.id}`}
            className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text on the left */}
              <div className="order-1 lg:order-1">
                <TextSection
                  data={currentSection}
                  isPreview={isPreview}
                  isInCombinedLayout={true}
                />
              </div>
              {/* Image on the right */}
              <div className="order-2 lg:order-2">
                <ImageSection
                  data={nextSection}
                  isPreview={isPreview}
                  isInCombinedLayout={true}
                />
              </div>
            </div>
          </div>
        );
        i += 2; // Skip both sections as we've rendered them together
      } else {
        // Render section normally
        renderedSections.push(renderSection(currentSection));
        i += 1;
      }
    }

    return renderedSections;
  };

  return (
    <div>
      {/* Render page heading if provided */}
      {pageTitle && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <PageHeading title={pageTitle} description={pageDescription} />
        </div>
      )}

      {/* Render sections */}
      <div>{renderSections()}</div>
    </div>
  );
};

export default SectionRenderer;
