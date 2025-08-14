import { CartView } from '../components/Cart/CartView';
import { PageWrapper } from '../components/Layout/PageWrapper';
import { Metadata } from 'next';
import { getPageSEO } from '@/app/lib/seo';

export const metadata: Metadata = getPageSEO('cart');

export default async function CartPage() {
  return (
    <PageWrapper>
      <CartView layout="full" />
    </PageWrapper>
  );
}
