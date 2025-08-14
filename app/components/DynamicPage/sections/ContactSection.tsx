import React from 'react';
import { ContactSectionData } from '../types';

interface ContactSectionProps {
  data: ContactSectionData;
  isPreview?: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  data,
  isPreview = false,
}) => {
  const { title, description, email, phone, address } = data;

  return (
    <section>
      {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}
      {description && (
        <p className="text-lg text-gray-700 mb-8">{description}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {email && (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <a
              href={`mailto:${email}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {email}
            </a>
          </div>
        )}
        {phone && (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <a
              href={`tel:${phone}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {phone}
            </a>
          </div>
        )}
        {address && (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-700">{address}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
