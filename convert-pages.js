const fs = require('fs');
const csv = require('csv-parser');
const { createObjectCsvStringifier } = require('csv-writer');

// Read and parse the old CSV file
const oldPages = [];

fs.createReadStream('/Users/burooj/Projects/paper-company/Pages-old.csv')
  .pipe(csv())
  .on('data', (row) => {
    oldPages.push(row);
  })
  .on('end', () => {
    console.log('Converting pages from old structure to new structure...');
    convertPages();
  });

function convertPages() {
  const convertedPages = oldPages.map((page) => {
    console.log(`\nConverting page: ${page.slug}`);

    // Start with basic page info
    const newPage = {
      slug: page.slug,
      title: page.Title,
      heading: page.heading,
      description: page.Description?.replace(/<[^>]*>/g, '').trim() || '', // Remove HTML tags from description
      section_text_1: '',
      section_text_2: '',
      section_features_1: '',
      section_image_1: '',
      section_image_2: '',
      section_testimonials_1: '',
      section_gallery_1: '',
      section_faq_1: '',
      section_contact_1: '',
      section_cta_1: '',
    };

    // Parse the sections JSON
    if (page.sections) {
      try {
        const sections = JSON.parse(page.sections);
        console.log(`Found ${sections.length} sections`);

        let textCount = 0;
        let imageCount = 0;

        sections.forEach((section, index) => {
          const order = index + 1;
          console.log(`  Section ${order}: ${section.type}`);

          switch (section.type) {
            case 'text':
              textCount++;
              const textField =
                textCount === 1 ? 'section_text_1' : 'section_text_2';
              if (textCount <= 2) {
                newPage[textField] = JSON.stringify({
                  order: order,
                  enabled: true,
                  title: section.title || '',
                  content: section.content || '',
                });
              }
              break;

            case 'features':
              newPage.section_features_1 = JSON.stringify({
                order: order,
                enabled: true,
                title: section.title || '',
                description: section.description || '',
                features: section.features || [],
              });
              break;

            case 'image':
              imageCount++;
              const imageField =
                imageCount === 1 ? 'section_image_1' : 'section_image_2';
              if (imageCount <= 2) {
                newPage[imageField] = JSON.stringify({
                  order: order,
                  enabled: true,
                  imageUrl: section.imageUrl || '',
                  alt: section.alt || '',
                  caption: section.caption || '',
                });
              }
              break;

            case 'testimonials':
              newPage.section_testimonials_1 = JSON.stringify({
                order: order,
                enabled: true,
                title: section.title || '',
                testimonials: section.testimonials || [],
              });
              break;

            case 'gallery':
              newPage.section_gallery_1 = JSON.stringify({
                order: order,
                enabled: true,
                title: section.title || '',
                images: section.images || [],
              });
              break;

            case 'faq':
              newPage.section_faq_1 = JSON.stringify({
                order: order,
                enabled: true,
                title: section.title || '',
                faqs: section.faqs || [],
              });
              break;

            case 'contact':
              newPage.section_contact_1 = JSON.stringify({
                order: order,
                enabled: true,
                title: section.title || '',
                description: section.description || '',
                email: section.email || '',
                phone: section.phone || '',
                address: section.address || '',
              });
              break;

            case 'cta':
              newPage.section_cta_1 = JSON.stringify({
                order: order,
                enabled: true,
                title: section.title || '',
                description: section.description || '',
                buttonText: section.buttonText || '',
                buttonLink: section.buttonLink || '',
              });
              break;

            default:
              console.log(`    Warning: Unknown section type: ${section.type}`);
          }
        });
      } catch (error) {
        console.error(
          `Error parsing sections for ${page.slug}:`,
          error.message
        );
      }
    }

    return newPage;
  });

  // Write the new CSV file
  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: 'slug', title: 'slug' },
      { id: 'title', title: 'title' },
      { id: 'heading', title: 'heading' },
      { id: 'description', title: 'description' },
      { id: 'section_text_1', title: 'section_text_1' },
      { id: 'section_text_2', title: 'section_text_2' },
      { id: 'section_features_1', title: 'section_features_1' },
      { id: 'section_image_1', title: 'section_image_1' },
      { id: 'section_image_2', title: 'section_image_2' },
      { id: 'section_testimonials_1', title: 'section_testimonials_1' },
      { id: 'section_gallery_1', title: 'section_gallery_1' },
      { id: 'section_faq_1', title: 'section_faq_1' },
      { id: 'section_contact_1', title: 'section_contact_1' },
      { id: 'section_cta_1', title: 'section_cta_1' },
    ],
  });

  const csvString =
    csvStringifier.getHeaderString() +
    csvStringifier.stringifyRecords(convertedPages);

  fs.writeFileSync(
    '/Users/burooj/Projects/paper-company/Pages-converted.csv',
    csvString
  );

  console.log('\n✅ Conversion complete!');
  console.log(`📁 Output saved to: Pages-converted.csv`);
  console.log(`📊 Converted ${convertedPages.length} pages`);

  // Show summary
  console.log('\n📋 Pages converted:');
  convertedPages.forEach((page) => {
    const sectionCount = Object.values(page).filter(
      (value) => typeof value === 'string' && value.startsWith('{"order"')
    ).length;
    console.log(`  • ${page.slug} (${sectionCount} sections)`);
  });
}
