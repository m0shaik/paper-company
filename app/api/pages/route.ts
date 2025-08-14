import { NextResponse } from 'next/server';

interface WixRawItem {
  id: string;
  dataCollectionId: string;
  data: {
    _id: string;
    _owner?: string;
    _createdDate?: { $date: string };
    _updatedDate?: { $date: string };
    [key: string]: any;
  };
}

interface WixQueryResponse {
  dataItems?: WixRawItem[];
  pagingMetadata?: {
    count: number;
    hasNext: boolean;
  };
}

export async function GET() {
  const required = ['WIX_API_KEY', 'WIX_SITE_ID', 'WIX_ACCOUNT_ID'];
  const missing = required.filter((k) => !process.env[k]);

  if (missing.length) {
    return NextResponse.json(
      { error: `Missing env vars: ${missing.join(', ')}` },
      { status: 500 }
    );
  }

  try {
    const res = await fetch('https://www.wixapis.com/wix-data/v2/items/query', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.WIX_API_KEY as string,
        'wix-site-id': process.env.WIX_SITE_ID as string,
        'wix-account-id': process.env.WIX_ACCOUNT_ID as string,
      },
      body: JSON.stringify({ dataCollectionId: 'Pages' }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Wix API error: ${res.status}` },
        { status: res.status }
      );
    }

    const json = (await res.json()) as WixQueryResponse;

    console.log(json);

    const items = (json.dataItems || []).map((r) => {
      const { _id, _owner, _createdDate, _updatedDate, ...cleanData } = r.data;

      return {
        id: r.id,
        created: _createdDate?.$date,
        updated: _updatedDate?.$date,
        // Spread all other fields, removing _fld suffix for cleaner names
        // This includes both legacy 'sections' array and new individual section fields
        // like section_text_1, section_image_1, etc.
        ...Object.fromEntries(
          Object.entries(cleanData).map(([key, value]) => [
            key.replace(/_fld$/, ''), // Remove _fld suffix
            value,
          ])
        ),
      };
    });

    return NextResponse.json({ items });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
