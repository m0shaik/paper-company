# Premium Wallpaper E-Commerce Platform - Project Summary

## Project Overview

**Timeline**: August 2024 - November 2024  
**Role**: Full-Stack Developer / Frontend Lead  
**Client**: Wallpaper & Wall Covering Company

**Project Context**: Client had an existing Wix-based e-commerce site but found Wix's frontend capabilities limiting for their specific business requirements (custom wallpaper dimensions, advanced product variants, custom UX). Built a custom Next.js frontend that integrates seamlessly with Wix's backend infrastructure while providing superior user experience and functionality.

---

## Technical Architecture

### Core Stack

- **Framework**: Next.js 13.4 (App Router, React Server Components)
- **Language**: TypeScript
- **Backend Integration**: Wix Headless APIs
- **State Management**: TanStack React Query v4
- **Styling**: Tailwind CSS + Custom Design System
- **Authentication**: Wix OAuth 2.0 Strategy
- **Deployment**: Netlify (JAMstack architecture)

### Key Dependencies & SDKs

- `@wix/sdk` - Core Wix SDK integration
- `@wix/stores` - Product catalog management
- `@wix/ecom` - Cart and checkout functionality
- `@wix/data` - Content management system integration

---

## Key Technical Achievements

### 1. Wix Headless Integration Architecture

**Challenge**: Bridge custom Next.js frontend with Wix backend while maintaining session state  
**Solution**:

- Implemented OAuth-based authentication flow with visitor token generation
- Created middleware layer for automatic session management and token refresh
- Designed dual-client architecture (server-side and client-side Wix SDK clients)
- Built type-safe API wrappers around Wix SDK methods

**Technical Implementation**:

```typescript
// Middleware for session persistence
- Auto-generates visitor tokens for guest checkout
- Manages refresh token cookies with 30-day expiration
- Handles server-side authentication for SSR/SSG
```

**Files**: [`middleware.ts`](middleware.ts:1), [`app/model/store/wix-server.ts`](app/model/store/wix-server.ts:1), [`app/model/ecom/ecom-api.ts`](app/model/ecom/ecom-api.ts:1)

---

### 2. Dynamic CMS & Page Builder System

**Challenge**: Enable client to manage content without code deployments  
**Solution**: Built comprehensive dynamic page system with modular sections

**Features**:

- 8+ reusable section types (Text, Image, Gallery, Testimonials, FAQ, Contact, CTA, Features)
- Intelligent layout system (auto-detects image+text combinations for side-by-side layouts)
- Wix Data integration for content management
- Dynamic slug-based routing
- Real-time content fetching with error handling

**Section Types Implemented**:

- Text sections with rich formatting support
- Image sections with optimization
- Photo galleries with grid layouts
- Testimonials sliders
- FAQ accordions
- Contact forms
- Call-to-action blocks
- Feature showcases

**Technical Implementation**:

- Custom API route for Wix Data integration
- Section renderer with intelligent layout detection
- Type-safe section definitions with TypeScript
- Automatic layout optimization for content combinations

**Files**: [`app/[dynamic-page]/page.tsx`](app/[dynamic-page]/page.tsx:1), [`app/components/DynamicPage/SectionRenderer.tsx`](app/components/DynamicPage/SectionRenderer.tsx:1), [`app/api/pages/route.ts`](app/api/pages/route.ts:1)

---

### 3. Custom Dimensions Calculator

**Challenge**: Wallpaper sold by square footage requires custom dimension inputs  
**Solution**: Built intelligent area calculator integrated with Wix cart

**Features**:

- Custom height/width inputs per product
- Automatic square footage calculation
- Real-time price updates based on dimensions
- Cart persistence of custom dimensions
- Dimension display throughout checkout flow

**Business Value**: Enabled client to sell wallpaper with precise custom measurements, critical for their business model

**Files**: [`app/components/QuantityAsUnitArea/QuantityAsUnitArea.tsx`](app/components/QuantityAsUnitArea/QuantityAsUnitArea.tsx:1), [`app/hooks/useUpdateCartItemDimensions.tsx`](app/hooks/useUpdateCartItemDimensions.tsx:1)

---

### 4. Advanced Product Variant System

**Challenge**: Complex product variants with multiple options (patterns, colors, finishes)  
**Solution**: Built sophisticated variant management with URL synchronization

**Features**:

- Multi-option variant selection (color swatches, dropdowns)
- Real-time variant availability calculation
- URL parameter synchronization for sharable product configurations
- Image gallery updates based on selected variant
- Visual variant grid with image previews
- Variant navigation through image gallery arrows

**Technical Highlights**:

- Custom hooks for variant logic ([`useProductOptions.ts`](app/hooks/useProductOptions.ts:1))
- URL state synchronization ([`useURLOptions.ts`](app/hooks/useURLOptions.ts:1))
- Dynamic image gallery system
- Optimistic UI updates for variant changes

**Files**: [`app/components/Product/ProductOptions/ProductOptions.tsx`](app/components/Product/ProductOptions/ProductOptions.tsx:1), [`app/components/Product/VariantGrid/VariantGrid.tsx`](app/components/Product/VariantGrid/VariantGrid.tsx:1)

---

### 5. Comprehensive SEO Implementation

**Challenge**: Maximize organic search visibility for e-commerce products  
**Solution**: Centralized SEO system with structured data

**Features Implemented**:

- Centralized SEO configuration system ([`seo-config.ts`](app/lib/seo-config.ts:1))
- Dynamic metadata generation for all page types
- JSON-LD structured data (Product, Organization, Breadcrumb schemas)
- Automated sitemap generation
- Social media meta tags (OpenGraph, Twitter Cards)
- Security headers configuration

**SEO Features**:

- Product schema with pricing, availability, ratings
- Breadcrumb navigation schemas
- Organization structured data
- Dynamic title templates
- Auto-generated meta descriptions
- Canonical URL management

**Business Impact**: Improved search engine indexing and product discoverability

**Files**: [`app/lib/seo-config.ts`](app/lib/seo-config.ts:1), [`app/lib/structured-data.ts`](app/lib/structured-data.ts:1), [`app/sitemap.ts`](app/sitemap.ts:1), [`SEO-MANAGEMENT.md`](SEO-MANAGEMENT.md:1)

---

### 6. E-commerce Cart & Checkout Integration

**Challenge**: Seamless integration with Wix Payments while maintaining custom UI  
**Solution**: Full cart management system with Wix backend integration

**Features**:

- Real-time cart state management with React Query
- Optimistic UI updates for cart operations
- Custom dimension preservation in cart
- Guest checkout support via visitor tokens
- Redirect session management for Wix checkout
- Post-purchase success page

**Cart Operations Implemented**:

- Add to cart with custom dimensions
- Update item quantities
- Update custom dimensions in cart
- Remove items
- Create checkout sessions
- Redirect to Wix-hosted checkout

**Files**: [`app/hooks/useCart.tsx`](app/hooks/useCart.tsx:1), [`app/model/ecom/ecom-api.ts`](app/model/ecom/ecom-api.ts:1), [`app/api/redirect-to-checkout/route.ts`](app/api/redirect-to-checkout/route.ts:1)

---

### 7. Performance Optimizations

**Implemented**:

- Static Site Generation (SSG) for product pages
- Incremental Static Regeneration (ISR)
- Image optimization with Next.js Image component
- Wix CDN integration for product images
- React Query caching strategies
- Pagination for large product catalogs (100+ products per query)
- Lazy loading for client components

**Results**:

- Fast initial page loads
- SEO-friendly static HTML
- Optimized asset delivery
- Efficient API request batching

**Files**: [`next.config.js`](next.config.js:1), [`app/product-page/[slug]/page.tsx`](app/product-page/[slug]/page.tsx:144)

---

## Technical Challenges Solved

### 1. Pagination for Large Catalogs

**Problem**: Wix API limits queries to 100 items per request  
**Solution**: Implemented automatic pagination with safety limits

```typescript
// Fetches ALL products by paginating through results
// Safety limit prevents infinite loops at 10,000 products
```

**Impact**: Enabled complete product catalog access for sitemap generation and category pages

### 2. Session State Management

**Problem**: Maintaining cart state across page refreshes and initial visits  
**Solution**:

- Visitor token generation in middleware
- Refresh token cookie management
- Graceful fallback for missing tokens
- Server-side and client-side client initialization

### 3. URL-Synced Product Options

**Problem**: Users couldn't share specific product configurations  
**Solution**:

- Built URL parameter synchronization system
- Debounced URL updates to prevent history pollution
- Automatic variant selection from URL on page load
- Maintains selection state during navigation

### 4. Complex Section Layouts

**Problem**: Client wanted flexible content arrangements (text + image side-by-side)  
**Solution**:

- Built intelligent section combination logic
- Auto-detects adjacent image+text sections
- Renders them in responsive grid layouts
- Maintains individual section rendering for other types

---

## Architecture Patterns & Best Practices

### Clean Architecture

- **Separation of Concerns**: API layer, components, hooks, utilities clearly separated
- **Type Safety**: Comprehensive TypeScript types for Wix API responses
- **Reusable Components**: Modular component library (30+ components)
- **Custom Hooks**: Abstracted complex logic into reusable hooks (8+ hooks)

### Code Organization

```
app/
├── api/              # Next.js API routes (Wix proxy endpoints)
├── components/       # Organized by feature/domain
├── hooks/           # Custom React hooks for business logic
├── lib/             # Utilities and configurations
├── model/           # API clients and type definitions
│   ├── ecom/        # E-commerce operations
│   ├── store/       # Product catalog operations
│   └── redirect/    # Checkout redirect logic
└── utils/           # Helper functions
```

### React Patterns Used

- Server Components for data fetching (RSC)
- Client Components for interactivity
- Custom hooks for state management
- Context providers for global state
- Compound component patterns
- Render props for flexibility

---

## Component Library Highlights

### Reusable Components Built

- **Product Components**: ProductOptions, ProductSidebar, Swatch, VariantGrid
- **Image Components**: ImageGallery (with navigation), optimized Image wrapper
- **Cart Components**: CartView, CartItem, CartBag indicator
- **Layout Components**: Header, Footer, PageWrapper, Sidebar
- **UI Components**: Custom Button, Input, Select, Dropdown, Skeleton loaders
- **CMS Components**: 8 section types for dynamic pages
- **SEO Components**: Breadcrumb, StructuredData, GoogleAnalytics

---

## Business Requirements Delivered

### Core E-commerce Features

✅ Product catalog with category filtering  
✅ Product variant selection (colors, patterns, finishes)  
✅ Custom dimension inputs for wallpaper (height × width)  
✅ Shopping cart with real-time updates  
✅ Secure checkout via Wix Payments  
✅ Order confirmation and success pages

### Content Management

✅ Dynamic page creation system  
✅ 8+ customizable section types  
✅ No-code content updates via Wix  
✅ Flexible layouts (single column, side-by-side)

### SEO & Marketing

✅ Comprehensive structured data implementation  
✅ Dynamic sitemap generation  
✅ OpenGraph and Twitter Card meta tags  
✅ Google Analytics integration  
✅ Security headers for better SEO ranking

---

## Performance Metrics

### Build Output

- Static page generation for all products
- Optimized bundle sizes
- Image optimization via Next.js
- Tree-shaking and code splitting

### SEO Compliance

- Semantic HTML throughout
- ARIA labels for accessibility
- Mobile-responsive design
- Fast Time to First Byte (TTFB)

---

## Development Workflow & Tooling

### Code Quality

- **ESLint**: Enforced code standards
- **Prettier**: Consistent code formatting
- **TypeScript**: Type safety across entire codebase
- **Git**: Version control with feature branches

### Testing & Validation

- Playwright E2E testing setup
- SEO validation scripts ([`scripts/seo-manager.js`](scripts/seo-manager.js:1))
- Development debugging tools
- Build analysis tools

---

## Integration Complexity

### Wix Services Integrated

1. **Wix Stores** - Product catalog, collections, inventory
2. **Wix E-commerce** - Cart, checkout, orders
3. **Wix Data** - Custom content collections (dynamic pages)
4. **Wix OAuth** - Authentication and session management
5. **Wix Media** - Image hosting and optimization
6. **Wix Redirects** - Checkout flow management

### API Patterns Implemented

- Server-side API routes as proxy layer
- Client-side mutations with optimistic updates
- Caching strategies for product data
- Error handling and retry logic
- Request/response transformation

---

## Key Deliverables

1. **Full-Featured E-Commerce Frontend**

   - Product browsing and search
   - Category navigation
   - Product detail pages with variants
   - Shopping cart functionality
   - Checkout integration

2. **Dynamic Content Management System**

   - Modular section-based page builder
   - 8+ pre-built section types
   - Flexible layout engine
   - Wix Data integration for content storage

3. **Custom Business Logic**

   - Wallpaper dimension calculator
   - Per-item custom measurements in cart
   - Unit area pricing calculations
   - Product variant availability logic

4. **SEO & Performance Infrastructure**

   - Centralized SEO configuration
   - Structured data implementation
   - Dynamic sitemap generation
   - Performance optimizations for Core Web Vitals

5. **Developer Experience**
   - Comprehensive type definitions
   - Reusable component library
   - Custom hooks for common patterns
   - Documentation (SEO management guide)

---

## Technical Skills Demonstrated

### Frontend Development

- Next.js 13 App Router (RSC, SSR, SSG, ISR)
- React 18 (Hooks, Context, Suspense)
- TypeScript (Generics, Type Guards, Utility Types)
- Tailwind CSS (Custom Design System)
- Responsive Design (Mobile-first approach)

### Backend/API Integration

- RESTful API integration
- OAuth 2.0 authentication
- Session management and cookies
- API route handlers (Next.js)
- Server-side data fetching
- Error handling and retry logic

### State Management

- React Query (mutations, queries, cache management)
- React Context for global state
- URL state synchronization
- Optimistic UI updates
- Client/server state coordination

### E-commerce Expertise

- Shopping cart implementation
- Checkout flow design
- Product variant management
- Dynamic pricing calculations
- Order management
- Guest checkout support

### SEO & Marketing

- Metadata optimization
- Structured data (Schema.org)
- OpenGraph/Twitter Cards
- Sitemap generation
- Breadcrumb navigation
- Analytics integration

### Developer Operations

- Git version control
- Environment configuration
- Build optimization
- Deployment pipelines
- Code quality tools (ESLint, Prettier)

---

## Problem-Solving Examples

### Complex Product Options

**Challenge**: Products with multiple variant options (color, pattern, finish) affecting price and availability  
**Solution**: Built custom variant selection logic that:

- Calculates available options based on current selection
- Updates pricing in real-time
- Syncs state with URL for shareability
- Manages image gallery per variant

### Custom Dimensions Integration

**Challenge**: Traditional e-commerce platforms don't support per-item custom measurements  
**Solution**:

- Extended Wix cart items with custom dimension fields
- Built UI for height/width input
- Implemented area calculation (sq ft)
- Persisted dimensions through entire checkout flow
- Created hooks for dimension updates ([`useUpdateCartItemDimensions.tsx`](app/hooks/useUpdateCartItemDimensions.tsx:1))

### Dynamic Content Without Redeployment

**Challenge**: Client needs to update site content without developer intervention  
**Solution**:

- Integrated with Wix Data Collections for content storage
- Built flexible section-based page system
- Created API proxy for Wix Data queries
- Implemented auto-layout detection for content combinations

---

## Code Quality & Architecture

### Design Patterns

- **Compound Components**: Complex UI components split into sub-components
- **Custom Hooks**: Business logic abstracted from components
- **Factory Pattern**: Dynamic section rendering based on type
- **Strategy Pattern**: Different authentication strategies (server/client)
- **Repository Pattern**: API clients abstract Wix SDK complexity

### Best Practices

- Type-safe API responses with TypeScript
- Error boundaries and graceful degradation
- Loading states with skeleton screens
- Responsive design with Tailwind
- Accessibility (ARIA labels, semantic HTML)
- Performance optimization (lazy loading, code splitting)
- Security headers and CORS configuration

---

## Measurable Impact

### Technical Improvements

- **Flexibility**: Unlimited UI customization vs. Wix template constraints
- **Performance**: Static generation for faster page loads
- **SEO**: Comprehensive structured data for better search rankings
- **Scalability**: Proper pagination handling for growing catalog
- **Maintainability**: Centralized configuration and type safety

### Business Value

- **Custom Requirements**: Supported unique dimension-based pricing
- **Content Control**: Client can update content via Wix dashboard
- **Brand Experience**: Custom UI matching brand guidelines
- **Conversion Optimization**: Optimized checkout flow
- **Future-Proof**: Flexible architecture for feature additions

---

## Project Statistics

- **Components Created**: 30+ reusable React components
- **API Integrations**: 6 Wix service modules integrated
- **Custom Hooks**: 8 specialized React hooks
- **Dynamic Routes**: Product pages, category pages, dynamic CMS pages
- **Section Types**: 8+ CMS section components
- **Git Commits**: 50+ commits over development period
- **Code Organization**: Clean architecture with clear separation of concerns

---

## Technologies & Tools

**Frontend**: Next.js 13, React 18, TypeScript, Tailwind CSS  
**Backend Integration**: Wix Headless SDK (Stores, E-commerce, Data)  
**State Management**: TanStack React Query, React Context  
**Authentication**: OAuth 2.0 (Wix strategy)  
**Build/Deploy**: Netlify, Yarn package manager  
**Code Quality**: ESLint, Prettier, TypeScript strict mode  
**Testing**: Playwright (E2E testing setup)  
**Version Control**: Git/GitHub with feature branch workflow

---

## Key Learnings

1. **Headless Commerce Architecture**: Successfully decoupled frontend from backend CMS while maintaining real-time data synchronization
2. **Third-Party Integration**: Deep integration with Wix SDK including authentication, cart state, and content management
3. **Complex State Management**: Coordinated state across URL parameters, React Query cache, Wix backend, and local UI state
4. **E-commerce UX**: Implemented industry-standard patterns for product browsing, variant selection, and checkout
5. **SEO Engineering**: Built comprehensive SEO infrastructure with structured data and dynamic metadata

---

## Resume Bullet Points

**Sample bullets for resume:**

- Architected and developed custom Next.js 13 e-commerce frontend integrating with Wix Headless APIs, replacing limited Wix UI while leveraging enterprise backend infrastructure for wallpaper company

- Built dynamic CMS page builder with 8+ modular section types enabling non-technical content management, reducing deployment needs and improving client autonomy

- Implemented complex product variant system with multi-option selection, URL state synchronization, and real-time availability calculation for 100+ SKUs

- Engineered custom dimensions calculator for per-item measurements (height × width → sq ft), extending Wix cart functionality to support unique wallpaper pricing model

- Designed comprehensive SEO infrastructure with centralized configuration, JSON-LD structured data, and dynamic metadata generation, improving search visibility

- Integrated OAuth 2.0 authentication flow with Wix backend, implementing middleware-based session management and visitor token generation for guest checkout

- Developed type-safe API layer abstracting Wix SDK complexity with automatic pagination, error handling, and response transformation

- Built responsive component library (30+ components) with Tailwind CSS design system, custom hooks (8+), and optimistic UI patterns using React Query

---

## Project Links

- **Live Site**: https://the.papercompany.ca
- **Repository**: [Private/Client Repository]
- **Documentation**: [SEO Management Guide](SEO-MANAGEMENT.md:1)

---

## Contact & Portfolio Notes

This project demonstrates:

- Full-stack development capabilities
- Complex third-party API integration
- E-commerce domain expertise
- Modern React patterns and best practices
- SEO and performance optimization
- Client requirement analysis and solution design

**Project Type**: Client work, Production application  
**Code Availability**: Available for portfolio review (with client permission)
