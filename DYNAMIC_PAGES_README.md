# Dynamic Pages CSV for Wix Import

This CSV contains example pages showing all available section components. You can import this data into your Wix collection to test the dynamic page functionality.

## CSV Structure

- **id**: Unique identifier for the page
- **slug**: URL slug (e.g., 'about-us' becomes '/about-us')
- **title**: Page title (for SEO and navigation)
- **heading**: Main heading displayed on the page (optional, defaults to title)
- **description**: Page description/subtitle (supports HTML)
- **sections**: JSON array of section objects

## Available Section Types

1. **text**: Rich text content with optional title
2. **image**: Single image with caption
3. **gallery**: Multiple images in a grid layout
4. **testimonials**: Customer testimonials with photos
5. **faq**: Frequently asked questions with accordion
6. **contact**: Contact information display
7. **cta**: Call-to-action section with button
8. **features**: Feature list with icons

## Section Properties

### Text Section

- `type`: "text"
- `title`: Section heading (optional)
- `content`: HTML content
- `alignment`: "left", "center", or "right"

### Image Section

- `type`: "image"
- `imageUrl`: URL to the image
- `alt`: Alt text for accessibility
- `caption`: Image caption (optional)

### Gallery Section

- `type`: "gallery"
- `title`: Section heading (optional)
- `images`: Array of image objects with url, alt, and caption

### Testimonials Section

- `type`: "testimonials"
- `title`: Section heading (optional)
- `testimonials`: Array with name, role, company, content, avatar

### FAQ Section

- `type`: "faq"
- `title`: Section heading (optional)
- `faqs`: Array with question and answer pairs

### Contact Section

- `type`: "contact"
- `title`: Section heading (optional)
- `description`: Contact description (optional)
- `email`: Email address (optional)
- `phone`: Phone number (optional)
- `address`: Physical address (optional)

### CTA Section

- `type`: "cta"
- `title`: Main heading
- `description`: Subtitle text (optional)
- `buttonText`: Button text (optional)
- `buttonLink`: Button URL (optional)

### Features Section

- `type`: "features"
- `title`: Section heading (optional)
- `description`: Section description (optional)
- `features`: Array with title, description, and icon

## Import Instructions

1. Create a collection called "Pages" in your Wix database
2. Add the following fields:
   - id (Text)
   - slug (Text)
   - title (Text)
   - heading (Text)
   - description (Rich Text)
   - sections (JSON)
3. Import the CSV data
4. Configure your API to read from this collection

## Example Usage

After importing, you can access pages via:

- `/about-us` - Shows company information
- `/contact` - Contact page with info and CTA
- `/faq` - FAQ page with accordion
- `/how-it-works` - Process explanation
- `/portfolio` - Work showcase with gallery
- `/services` - Service offerings with features
