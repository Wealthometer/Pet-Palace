import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { getFeaturedProducts } from '../../data/products';
import ProductGrid from '../products/ProductGrid';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Hand-picked favorites for you and your pets
            </p>
          </div>
          <Link to="/shop">
            <Button variant="outline" className="gap-2">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
