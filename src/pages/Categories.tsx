import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { categories, products } from '../data/products';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const categoryImages: Record<string, string> = {
  pets: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
  food: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800',
  toys: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800',
  accessories: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800',
  health: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800',
  beds: 'https://images.unsplash.com/photo-1567612529009-afe25813a308?w=800',
};

const Categories = () => {
  const getCategoryProductCount = (categoryId: string) => {
    return products.filter(p => p.category === categoryId).length;
  };

  return (
    <Layout>
      <div className="bg-accent/30 py-8">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2"
          >
            Shop by Category
          </motion.h1>
          <p className="text-muted-foreground">
            Browse our wide selection of pets and pet supplies
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Link to={`/shop?category=${category.id}`} className="group block">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-soft"
                >
                  {/* Background Image */}
                  <img
                    src={categoryImages[category.id]}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-5xl mb-2"><category.icon color="orange" /></span>
                    <h2 className="font-heading font-bold text-2xl text-background mb-1">
                      {category.name}
                    </h2>
                    <p className="text-background/70">
                      {getCategoryProductCount(category.id)} products
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Categories;
