// resources/js/pages/ProductDetail.jsx
import products from '../data/products';
import ProductDetails from '../components/product/ProductDetails';
import ProductList from '@/components/home/productList';
import Navbar  from '@/components/home/navbar';

export default function ProductDetail({ id }) {
  // Trouve le produit correspondant
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div style={{ padding: '50px', color: 'red' }}>
        Produit ID {id} non trouvé
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gray-100 p-6">
      <ProductDetails product={product} />
      <ProductList/>
    </div>
  );
}
