# New Section Field Structure

## Overview

We've redesigned the page structure to make it much easier for clients to manage content in Wix Collections. Instead of having one complex JSON array with all sections, we now have **individual object fields** for each section type.

## Benefits

### ✅ **For Clients:**

- **Easier to edit**: Each section is a separate field in Wix Collections
- **Clear structure**: No need to manage complex JSON arrays
- **Visual organization**: Can see all available sections at a glance
- **Less error-prone**: Wix Collections validates each field individually

### ✅ **For Developers:**

- **Flexible ordering**: Each section has an `order` field
- **Enable/disable sections**: Each section has an `enabled` field
- **Expandable**: Easy to add `section_text_2`, `section_image_2`, etc.
- **Backward compatible**: Still supports legacy `sections` array

## New Field Structure

### Base Field Properties

Every section field has these properties:

```json
{
  "order": 1, // Number: Controls display order (1, 2, 3, etc.)
  "enabled": true // Boolean: Whether to show this section
  // ... section-specific content
}
```

### Available Section Fields

| Field Name               | Description            | Max Per Page                  |
| ------------------------ | ---------------------- | ----------------------------- |
| `section_text_1`         | Text content section   | 2 (can add `section_text_2`)  |
| `section_image_1`        | Single image section   | 2 (can add `section_image_2`) |
| `section_gallery_1`      | Image gallery          | 1                             |
| `section_features_1`     | Features/services grid | 1                             |
| `section_testimonials_1` | Customer testimonials  | 1                             |
| `section_faq_1`          | FAQ section            | 1                             |
| `section_contact_1`      | Contact information    | 1                             |
| `section_cta_1`          | Call-to-action button  | 1                             |

## CSV Structure

### Old Structure (Complex)

```csv
"slug","title","sections"
"about","About Us","[{""type"":""text"",""title"":""Our Story"",...},{""type"":""image"",...}]"
```

### New Structure (Simple)

```csv
"slug","title","section_text_1","section_image_1","section_features_1"
"about","About Us","{""order"":1,""enabled"":true,""title"":""Our Story"",""content"":""...""}","{""order"":2,""enabled"":true,""imageUrl"":""...""}","{""order"":3,""enabled"":true,""title"":""Features"",...}"
```

## Example Section Configurations

### Text Section

```json
{
  "order": 1,
  "enabled": true,
  "title": "Our Story",
  "content": "<p>Welcome to our company! We started with a simple mission...</p>"
}
```

### Features Section

```json
{
  "order": 2,
  "enabled": true,
  "title": "What Sets Us Apart",
  "description": "The core values that guide our work",
  "features": [
    {
      "title": "Customer First",
      "description": "Every decision starts with our customers",
      "icon": "🎯"
    }
  ]
}
```

### Image Section

```json
{
  "order": 3,
  "enabled": true,
  "imageUrl": "https://example.com/image.jpg",
  "alt": "Team working together",
  "caption": "Our dedicated team"
}
```

### Disabled Section

```json
{
  "order": 4,
  "enabled": false
}
```

## How It Works

1. **Client edits individual fields** in Wix Collections
2. **System reads all section fields** from the database
3. **Helper function converts** enabled sections to array
4. **Sections are sorted** by the `order` field
5. **SectionRenderer displays** sections in correct order

## Migration Strategy

### Phase 1: Support Both Structures

- ✅ New `convertFieldsToSections()` function
- ✅ Updated types with individual section fields
- ✅ Backward compatibility with existing `sections` array

### Phase 2: Client Transition

- Create new pages using individual fields
- Migrate existing pages gradually
- Keep legacy support during transition

### Phase 3: Full Adoption

- All new pages use individual fields
- Legacy `sections` array becomes backup only

## Wix Collections Setup

### Field Configuration

```
Field Name: section_text_1
Field Type: Object
Required: No
Description: "Text section content (order, enabled, title, content)"

Field Name: section_image_1
Field Type: Object
Required: No
Description: "Image section content (order, enabled, imageUrl, alt, caption)"

// ... repeat for each section type
```

### Client Instructions

1. **Set order**: Use numbers (1, 2, 3, etc.) to control section order
2. **Enable/disable**: Set `enabled: true` to show, `enabled: false` to hide
3. **Add content**: Fill in the section-specific fields
4. **Multiple sections**: Use `section_text_2` for a second text section

## Benefits Summary

| Aspect                | Old Structure          | New Structure              |
| --------------------- | ---------------------- | -------------------------- |
| **Editing**           | Complex JSON array     | Simple object fields       |
| **Validation**        | Manual JSON validation | Wix Collections validation |
| **Organization**      | Single massive field   | Clear, separate fields     |
| **Expandability**     | Modify array structure | Add new numbered fields    |
| **Client Experience** | Technical/intimidating | User-friendly forms        |
| **Error Prevention**  | Easy to break JSON     | Field-level validation     |

This new structure makes the system much more client-friendly while maintaining all the flexibility and power of the original design!
