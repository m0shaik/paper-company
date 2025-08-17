// curl -X POST \
// 'https://www.wixapis.com/wix-data/v2/items/query' \
// -H 'Content-Type: application/json' \
// -H 'Authorization: <AUTH>' \
// -d '{
//     "dataCollectionId": "Pages",
//
// }'

// curl <GET/POST> \
//   '<endpoint>' \
//   -H 'Authorization: <APIKEY>' \
//   -H 'wix-site-id: <SITEID>' \

//process.env.WIX_CLIENT_ID
//process.env.WIX_SITE_ID
//process.env.WIX_ACCOUNT_ID

import React from 'react';
import SectionRenderer from '../components/DynamicPage/SectionRenderer';
import {
  DynamicPageData,
  convertFieldsToSections,
} from '../components/DynamicPage/types';

async function fetchPages(): Promise<{
  items: DynamicPageData[];
  error?: string;
}> {
  try {
    const res = await fetch('https://the.papercompany.ca/api/pages', {
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { items: [], error: errorData.error || `HTTP ${res.status}` };
    }

    const data = await res.json();
    return { items: data.items || [] };
  } catch (error: any) {
    return { items: [], error: error.message || 'Network error' };
  }
}

export default async function Page({
  params,
}: {
  params: { 'dynamic-page'?: string };
}) {
  const { items, error } = await fetchPages();
  const slug = params?.['dynamic-page'];

  // Find the page that matches the current slug
  const currentPage = items.find((item) => item.slug === slug);

  return (
    <div className="min-h-screen">
      {error && (
        <div className="max-w-4xl mx-auto py-10">
          <div className="rounded bg-red-100 text-red-700 p-3 text-sm">
            {error}
          </div>
        </div>
      )}

      {!error && !currentPage && slug && (
        <div className="max-w-4xl mx-auto py-10">
          <div className="rounded bg-yellow-100 text-yellow-700 p-3 text-sm">
            No page found with slug: <code>{slug}</code>
          </div>
        </div>
      )}

      {currentPage ? (
        <div>
          {/* Page Header */}

          {/* Render Sections */}
          {(() => {
            // Convert individual section fields to sections array if they exist
            const sectionsFromFields = convertFieldsToSections(currentPage);
            const sections =
              sectionsFromFields.length > 0
                ? sectionsFromFields
                : currentPage.sections || [];

            return sections.length > 0 ? (
              <SectionRenderer
                sections={sections}
                pageTitle={currentPage.heading || currentPage.title}
                pageDescription={currentPage.description}
              />
            ) : (
              <SectionRenderer
                pageTitle={currentPage.heading || currentPage.title}
                pageDescription={currentPage.description}
                sections={[]}
              />
            );
          })()}

          {/* Debug section to show all available fields - only for template page */}
          {slug === 'template' && (
            <details className="mt-16 max-w-4xl mx-auto">
              <summary className="cursor-pointer text-sm text-gray-500">
                Debug: All fields
              </summary>
              <pre className="text-xs p-3 bg-gray-100 rounded overflow-x-auto mt-2">
                {JSON.stringify(currentPage, null, 2)}
              </pre>
            </details>
          )}
        </div>
      ) : (
        <section className="max-w-4xl mx-auto py-10">
          <h2 className="text-xl font-medium mb-4">All Pages</h2>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`/${item.slug}`}
                  className="block rounded border p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="block text-xs text-gray-500 mt-1">
                    /{item.slug}
                  </span>
                  {item.updated && (
                    <span className="block text-xs text-gray-400 mt-1">
                      Updated: {new Date(item.updated).toLocaleString()}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
