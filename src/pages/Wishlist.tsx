import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { useWishlist } from '../context/WishlistContext';
import ProductGrid from '../components/products/ProductGrid';

const Wishlist = () => {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            <h1 className="font-heading text-2xl font-bold mb-3">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link to="/shop">
              <Button className="gap-2">
                Browse Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-heading text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <Button variant="outline" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        </motion.div>

        <ProductGrid products={items} />
      </div>
    </Layout>
  );
};

export default Wishlist;
