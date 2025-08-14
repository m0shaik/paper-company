// Base interfaces for dynamic page sections
export interface BaseSectionProps {
  id: string;
  type: string;
}

// Text Section
export interface TextSectionData extends BaseSectionProps {
  type: 'text';
  title?: string;
  content: string;
}

// Image Section
export interface ImageSectionData extends BaseSectionProps {
  type: 'image';
  imageUrl: string;
  alt: string;
  caption?: string;
}

// Gallery Section
export interface GallerySectionData extends BaseSectionProps {
  type: 'gallery';
  title?: string;
  images: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
}

// Testimonials Section
export interface TestimonialsSectionData extends BaseSectionProps {
  type: 'testimonials';
  title?: string;
  testimonials: Array<{
    name: string;
    role?: string;
    company?: string;
    content: string;
    avatar?: string;
  }>;
}

// FAQ Section
export interface FAQSectionData extends BaseSectionProps {
  type: 'faq';
  title?: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

// Contact Section
export interface ContactSectionData extends BaseSectionProps {
  type: 'contact';
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
}

// CTA Section
export interface CTASectionData extends BaseSectionProps {
  type: 'cta';
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

// Features Section
export interface FeaturesSectionData extends BaseSectionProps {
  type: 'features';
  title?: string;
  description?: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

// Union type for all section types
export type SectionData =
  | TextSectionData
  | ImageSectionData
  | GallerySectionData
  | TestimonialsSectionData
  | FAQSectionData
  | ContactSectionData
  | CTASectionData
  | FeaturesSectionData;

// New individual section field types
export interface SectionField {
  order: number;
  enabled: boolean;
}

export interface TextSectionField extends SectionField {
  title?: string;
  content: string;
}

export interface ImageSectionField extends SectionField {
  // Now just a string URL for Wix images
}

export interface GallerySectionField extends SectionField {
  title?: string;
  // Now an array of WixImage objects
}

export interface TestimonialsSectionField extends SectionField {
  title?: string;
  testimonials: Array<{
    name: string;
    role?: string;
    company?: string;
    content: string;
    avatar?: string;
  }>;
}

export interface FAQSectionField extends SectionField {
  title?: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export interface ContactSectionField extends SectionField {
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface CTASectionField extends SectionField {
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface FeaturesSectionField extends SectionField {
  title?: string;
  description?: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

// Wix image object structure
export interface WixImage {
  description?: string;
  fileName: string;
  slug: string;
  alt?: string;
  src: string;
  title: string;
  type: string;
  settings: {
    width: number;
    height: number;
    focalPoint: [number, number];
  };
}

// Page data structure with individual section fields
export interface DynamicPageData {
  id: string;
  slug: string;
  title: string;
  heading?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;

  // Individual section fields - updated for Wix format
  section_text?: TextSectionField;
  section_text_1?: TextSectionField;
  section_text_2?: TextSectionField;
  section_image?: string; // Changed to string for Wix image URL
  section_image_1?: string;
  section_image_2?: string;
  section_gallery?: WixImage[]; // Changed to array of Wix images
  section_gallery_1?: WixImage[];
  section_testimonials?: TestimonialsSectionField;
  section_testimonials_1?: TestimonialsSectionField;
  section_faq?: FAQSectionField;
  section_faq_1?: FAQSectionField;
  section_contact?: ContactSectionField;
  section_contact_1?: ContactSectionField;
  section_cta?: CTASectionField;
  section_cta_1?: CTASectionField;
  section_features?: FeaturesSectionField;
  section_features_1?: FeaturesSectionField;

  // Legacy support for existing sections array
  sections?: SectionData[];

  created?: string;
  updated?: string;
  status?: 'draft' | 'published';
}

// Helper function to convert individual fields to sections array
export function convertFieldsToSections(
  pageData: DynamicPageData
): SectionData[] {
  const sections: Array<SectionData & { order: number }> = [];

  // Handle image sections (simple string URLs)
  const imageFields = [
    { field: pageData.section_image, suffix: '' },
    { field: pageData.section_image_1, suffix: '_1' },
    { field: pageData.section_image_2, suffix: '_2' },
  ];

  imageFields.forEach(({ field, suffix }, index) => {
    if (field && typeof field === 'string') {
      const imageSection: ImageSectionData = {
        id: `image${suffix}`,
        type: 'image',
        imageUrl: field,
        alt: `Image${suffix}`,
        caption: undefined,
      };
      sections.push({ ...imageSection, order: index + 1 });
    }
  });

  // Handle gallery sections (arrays of Wix images)
  const galleryFields = [
    { field: pageData.section_gallery, suffix: '' },
    { field: pageData.section_gallery_1, suffix: '_1' },
  ];

  galleryFields.forEach(({ field, suffix }, index) => {
    if (field && Array.isArray(field) && field.length > 0) {
      const gallerySection: GallerySectionData = {
        id: `gallery${suffix}`,
        type: 'gallery',
        title: undefined,
        images: field.map((img: WixImage) => ({
          url: img.src,
          alt: img.alt || img.title || img.fileName,
          caption: img.description || undefined,
        })),
      };
      sections.push({ ...gallerySection, order: index + 10 });
    }
  });

  // Handle other section types with the existing logic
  const otherFieldChecks = [
    { field: pageData.section_text, type: 'text', suffix: '' },
    { field: pageData.section_text_1, type: 'text', suffix: '_1' },
    { field: pageData.section_text_2, type: 'text', suffix: '_2' },
    { field: pageData.section_testimonials, type: 'testimonials', suffix: '' },
    {
      field: pageData.section_testimonials_1,
      type: 'testimonials',
      suffix: '_1',
    },
    { field: pageData.section_faq, type: 'faq', suffix: '' },
    { field: pageData.section_faq_1, type: 'faq', suffix: '_1' },
    { field: pageData.section_contact, type: 'contact', suffix: '' },
    { field: pageData.section_contact_1, type: 'contact', suffix: '_1' },
    { field: pageData.section_cta, type: 'cta', suffix: '' },
    { field: pageData.section_cta_1, type: 'cta', suffix: '_1' },
    { field: pageData.section_features, type: 'features', suffix: '' },
    { field: pageData.section_features_1, type: 'features', suffix: '_1' },
  ];

  otherFieldChecks.forEach(({ field, type, suffix }) => {
    if (
      field &&
      typeof field === 'object' &&
      'enabled' in field &&
      field.enabled
    ) {
      const { order, enabled, ...sectionContent } = field as any;
      const sectionData = {
        id: `${type}${suffix}`,
        type,
        ...sectionContent,
      } as SectionData;

      sections.push({ ...sectionData, order: order || 999 });
    }
  });

  // Sort by order
  sections.sort((a, b) => a.order - b.order);

  // Remove order field for final result
  return sections.map(({ order, ...section }) => section);
}

// Component props for sections
export type SectionComponentProps<T extends SectionData> = {
  data: T;
  isPreview?: boolean;
};
