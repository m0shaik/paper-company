import { CartView } from "../components/Cart/CartView";
import { PageWrapper } from '../components/Layout/PageWrapper';

export default async function CartPage() {
  return (
    <PageWrapper>
      <CartView layout="full" />
    </PageWrapper>
  );
}
