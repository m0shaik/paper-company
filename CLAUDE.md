# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 13+ e-commerce site using Wix Headless APIs for stores and e-commerce functionality. The project uses the App Router pattern with React Server Components.

use Yarn for this project

## Development Commands

```bash
# Install dependencies (per user preferences, use Bun as package manager)
yarn install

# Run development server
yarn dev
# or with debugging
yarn debug

# Build the project
yarn build

# Start production server
yarn start

# Run linting (auto-fix enabled)
yarn lint

# Run e2e tests
yarn test
# or
yarn e2e
```

## Architecture Overview

### Core Technologies

- **Next.js 13.4.9** with App Router
- **Wix SDK** for headless e-commerce
  - https://dev.wix.com/docs/go-headless/
- **TanStack Query v4** for data fetching and caching
- **Tailwind CSS** with Flowbite components
- **TypeScript** for type safety

### Directory Structure

- `/app` - Next.js App Router pages and components
  - `/api` - API routes for checkout and quick-buy
  - `/components` - Reusable UI components
  - `/hooks` - Custom React hooks for cart, pricing, and Wix client
  - `/model` - API wrappers for Wix services
  - `/store` - Store catalog and category pages
  - `/product-page` - Individual product pages
  - `/cart` - Shopping cart page
- `/public` - Static assets (images, videos)

### Key Components

#### Authentication & Client Setup

- Wix OAuth integration via `WIX_CLIENT_ID` environment variable
- Server-side client: `app/hooks/useWixClientServer.ts`
- Client provider: `app/components/Provider/Providers.tsx`
- Refresh token stored in cookies (`WIX_REFRESH_TOKEN`)

#### Data Models

- **Store API** (`app/model/store/store-api.ts`): Products and collections
- **E-commerce API** (`app/model/ecom/ecom-api.ts`): Cart and checkout
- **Redirect API** (`app/model/redirect/redirect-api.ts`): URL redirects

#### Main Routes

- `/` - Homepage with hero, about, menu showcase, store products, testimonials, and gallery
- `/store` - Product catalog with category filtering
- `/store/category/[category]` - Products filtered by category
- `/product-page/[slug]` - Individual product pages with options and add to cart
- `/cart` - Shopping cart with checkout functionality
- `/stores-success` - Order success page

### Environment Setup

Required environment variable:

- `WIX_CLIENT_ID` - OAuth client ID from Wix Headless project

### Deployment Notes

- Supports any platform with Next.js 13+ and App Router
- Requires `WIX_CLIENT_ID` environment variable
- Production build runs on port 3000 by default
- i have it running, you dont need to run a dev server.
