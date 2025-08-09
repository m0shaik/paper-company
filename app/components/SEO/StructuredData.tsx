import { StructuredData } from '@/app/lib/structured-data';

interface StructuredDataProps {
    data: StructuredData | StructuredData[];
}

export function StructuredDataScript({ data }: StructuredDataProps) {
    const jsonLd = Array.isArray(data)
        ? data.map(item => JSON.stringify(item)).join('\n')
        : JSON.stringify(data);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
    );
}
