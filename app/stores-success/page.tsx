import { getOrder } from '@/app/model/ecom/ecom-api';
import { PageWrapper } from '@/app/components/Layout/PageWrapper';
import Image from 'next/image';
import { media } from '@wix/sdk';
import { PLACEHOLDER_IMAGE } from '@/app/constants';

export const dynamic = "force-dynamic";

export default async function Success({ searchParams }: any) {
  if (!searchParams.orderId) {
    return null;
  }

  const data = await getOrder(searchParams.orderId);
  return (
    data && (
      <PageWrapper>
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12">
          <div className="max-w-4xl w-full space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Thank you for purchasing!
              </h1>
              <p className="text-xl md:text-2xl text-gray-600">
                You just bought:
              </p>
            </div>

            {/* Order Items Section */}
            <div className=" rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 text-center">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
              <ul className="divide-y divide-gray-200">
                {data.lineItems!.map((item) => {
                  // Extract dimensions
                  const width = parseFloat(
                    item.catalogReference?.options?.customTextFields?.Width?.replace(' ft', '') || '0'
                  );
                  const height = parseFloat(
                    item.catalogReference?.options?.customTextFields?.Height?.replace(' ft', '') || '0'
                  );
                  const area = width * height;

                  // Calculate prices
                  const perSqFtAmount = Number.parseFloat(item.price?.amount!) || 0;
                  const totalAmount = perSqFtAmount * item.quantity!;

                  return (
                    <li key={item._id} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                        {/* Product Image */}
                        <div className="w-48 h-48 md:w-32 md:h-32 mx-auto md:mx-0 flex-shrink-0 relative overflow-hidden rounded-lg shadow-md">
                          <Image
                            alt={item.productName?.original || "Product"}
                            fill
                            className="object-cover"
                            src={
                              media.getScaledToFitImageUrl(item.image!, 300, 300, {}) ||
                              PLACEHOLDER_IMAGE
                            }
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-3">
                          <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900">
                              {item.productName?.original}
                            </h3>
                          </div>

                          {/* Product Options */}
                          <div className="space-y-1 text-center">
                            {item.descriptionLines
                              ?.filter(
                                (line) =>
                                  line.name?.original &&
                                  line.plainText?.original &&
                                  line.plainText.original.trim() !== '' &&
                                  !['Height', 'Width', 'Area', 'Total Area', 'Note'].includes(
                                    line.name.original
                                  )
                              )
                              .map((line, index) => (
                                <div key={`desc-${index}`} className="text-sm text-gray-600">
                                  <span className="font-medium">{line.name!.original}:</span>{' '}
                                  {line.plainText!.original}
                                </div>
                              ))}
                          </div>

                          {/* Dimensions and Pricing in Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Dimensions */}
                            <div className="rounded-lg p-3 text-center">
                              <div className="text-xs font-medium text-gray-500 uppercase">Width</div>
                              <div className="text-lg font-bold text-gray-900">{width} ft</div>
                            </div>
                            <div className="rounded-lg p-3 text-center">
                              <div className="text-xs font-medium text-gray-500 uppercase">Height</div>
                              <div className="text-lg font-bold text-gray-900">{height} ft</div>
                            </div>
                            <div className="rounded-lg p-3 text-center">
                              <div className="text-xs font-medium text-gray-500 uppercase">Area</div>
                              <div className="text-lg font-bold text-gray-900">{area.toFixed(2)} sq ft</div>
                            </div>
                            <div className=" rounded-lg p-3 text-center">
                              <div className="text-xs font-medium text-primary-500 uppercase">Total</div>
                              <div className="text-lg font-bold text-primary-500">{data.currency} {totalAmount.toFixed(2)}</div>
                            </div>
                          </div>

                          {/* Price per sq ft */}
                          <div className="text-sm text-gray-600 text-center">
                            <span className="font-medium">Price per sq ft:</span> {data.currency} {perSqFtAmount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer Section */}
            <div className="text-center space-y-4">
              <p className="text-lg text-gray-600">
                Your order has been confirmed and is being processed.
              </p>
              <p className="text-sm text-gray-500">
                You will receive an email confirmation shortly.
              </p>
            </div>
          </div>
        </div>
      </PageWrapper>
    )
  );
}
