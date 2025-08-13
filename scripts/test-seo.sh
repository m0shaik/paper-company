#!/bin/bash

# SEO Testing Script for Paper Company Website
# Run this script to validate SEO implementation

echo "🔍 SEO Implementation Validation"
echo "================================="

BASE_URL="http://localhost:3000"

# Check if Next.js dev server is running
if ! curl -s "$BASE_URL" > /dev/null; then
    echo "❌ Next.js server is not running on $BASE_URL"
    echo "Please run 'yarn dev' first"
    exit 1
fi

echo "✅ Next.js server is running"

# Function to check if URL returns 200
check_url() {
    local url=$1
    local name=$2
    
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [ "$status" = "200" ]; then
        echo "✅ $name: $url"
    else
        echo "❌ $name: $url (Status: $status)"
    fi
}

# Test core pages
echo ""
echo "📄 Testing Core Pages:"
check_url "$BASE_URL" "Homepage"
check_url "$BASE_URL/store" "Store Page"
check_url "$BASE_URL/sitemap.xml" "Sitemap"
check_url "$BASE_URL/robots.txt" "Robots.txt"

# Test structured data
echo ""
echo "🏗️ Testing Structured Data:"

# Check for JSON-LD on homepage
if curl -s "$BASE_URL" | grep -q "application/ld+json"; then
    echo "✅ Structured data found on homepage"
else
    echo "❌ No structured data found on homepage"
fi

# Test meta tags
echo ""
echo "🏷️ Testing Meta Tags:"

homepage_content=$(curl -s "$BASE_URL")

if echo "$homepage_content" | grep -q "<title>"; then
    echo "✅ Title tag found"
else
    echo "❌ Title tag missing"
fi

if echo "$homepage_content" | grep -q 'name="description"'; then
    echo "✅ Meta description found"
else
    echo "❌ Meta description missing"
fi

if echo "$homepage_content" | grep -q 'property="og:'; then
    echo "✅ Open Graph tags found"
else
    echo "❌ Open Graph tags missing"
fi

if echo "$homepage_content" | grep -q 'name="twitter:'; then
    echo "✅ Twitter Card tags found"
else
    echo "❌ Twitter Card tags missing"
fi

# Test PWA manifest
if echo "$homepage_content" | grep -q 'rel="manifest"'; then
    echo "✅ PWA manifest linked"
else
    echo "❌ PWA manifest not linked"
fi

echo ""
echo "📊 SEO Validation Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Test with Google's Rich Results Test: https://search.google.com/test/rich-results"
echo "2. Validate structured data: https://validator.schema.org/"
echo "3. Check mobile-friendliness: https://search.google.com/test/mobile-friendly"
echo "4. Test page speed: https://pagespeed.web.dev/"
echo "5. Submit sitemap to Google Search Console"
