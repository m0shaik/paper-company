# Client Guide: Managing Page Sections

## Overview

Your website now uses an improved section management system. Instead of one complex field, each section type has its own simple field that you can easily edit in Wix Collections.

## How to Edit Sections

### 1. **Order Your Sections**

Set the `order` number to control where each section appears:

- `"order": 1` = First section
- `"order": 2` = Second section
- `"order": 3` = Third section

### 2. **Enable/Disable Sections**

Control which sections show on your page:

- `"enabled": true` = Section will appear
- `"enabled": false` = Section will be hidden

### 3. **Add Your Content**

Each section type has specific fields for content:

## Section Types & Examples

### 📝 Text Section (`section_text_1`)

For written content, introductions, descriptions.

**Example:**

```json
{
  "order": 1,
  "enabled": true,
  "title": "Welcome to Our Company",
  "content": "<p>We provide exceptional products and services...</p>"
}
```

**What to change:**

- `title`: The heading for this section
- `content`: Your text (can include HTML like `<strong>bold</strong>` and `<em>italic</em>`)

### 🖼️ Image Section (`section_image_1`)

For single important images.

**Example:**

```json
{
  "order": 2,
  "enabled": true,
  "imageUrl": "https://yoursite.com/team-photo.jpg",
  "alt": "Our team working together",
  "caption": "Our dedicated team of professionals"
}
```

**What to change:**

- `imageUrl`: Your image URL
- `alt`: Description for accessibility
- `caption`: Text that appears under the image

### ⭐ Features Section (`section_features_1`)

For highlighting services, benefits, or key points.

**Example:**

```json
{
  "order": 3,
  "enabled": true,
  "title": "Why Choose Us",
  "description": "What makes us different",
  "features": [
    {
      "title": "Expert Team",
      "description": "Years of experience in the industry",
      "icon": "👥"
    },
    {
      "title": "Quality Service",
      "description": "We never compromise on quality",
      "icon": "⭐"
    }
  ]
}
```

**What to change:**

- `title`: Section heading
- `description`: Brief explanation
- `features`: Array of your key points (add/remove as needed)

### 💬 Testimonials Section (`section_testimonials_1`)

For customer reviews and testimonials.

**Example:**

```json
{
  "order": 4,
  "enabled": true,
  "title": "What Our Customers Say",
  "testimonials": [
    {
      "name": "John Smith",
      "role": "CEO",
      "company": "ABC Corp",
      "content": "Excellent service and results!",
      "avatar": "https://example.com/john.jpg"
    }
  ]
}
```

### 📞 Contact Section (`section_contact_1`)

For contact information.

**Example:**

```json
{
  "order": 5,
  "enabled": true,
  "title": "Get In Touch",
  "description": "We'd love to hear from you",
  "email": "hello@yourcompany.com",
  "phone": "+1 (555) 123-4567",
  "address": "123 Main St, Your City, ST 12345"
}
```

### 🎯 Call-to-Action Section (`section_cta_1`)

For important buttons and calls-to-action.

**Example:**

```json
{
  "order": 6,
  "enabled": true,
  "title": "Ready to Get Started?",
  "description": "Contact us today for a free consultation",
  "buttonText": "Get Started Now",
  "buttonLink": "/contact"
}
```

## Common Tasks

### ✅ **Add a New Page**

1. Create new row in Wix Collections
2. Set `slug` (URL) and `title`
3. Fill in the section fields you want to use
4. Set `order` numbers (1, 2, 3, etc.)
5. Set `enabled: true` for sections you want to show

### ✅ **Reorder Sections**

Just change the `order` numbers:

- Want testimonials first? Set `"order": 1`
- Want contact last? Set `"order": 6`

### ✅ **Hide a Section Temporarily**

Set `"enabled": false` instead of deleting content

### ✅ **Add Multiple Text Sections**

Use both `section_text_1` and `section_text_2` with different order numbers

## Tips

1. **Start Simple**: Enable just 2-3 sections for your first page
2. **Test Order**: Use order numbers like 1, 5, 10 so you can easily insert sections later
3. **Keep Backups**: Save your JSON content before making major changes
4. **Preview Changes**: Always check how your page looks after editing

## Need Help?

If you're unsure about the JSON format, look at existing working pages as examples. Copy the structure and just change the content to match your needs.
