'use client';

import React from "react"

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info(`Removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`Added to wishlist!`);
    }
  };

  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = isOnSale
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-300 border border-border">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isOnSale && (
                <Badge className="bg-destructive text-destructive-foreground">
                  -{discountPercent}%
                </Badge>
              )}
              {product.featured && (
                <Badge className="bg-secondary text-secondary-foreground">
                  Featured
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge className="bg-destructive text-destructive-foreground">
                  Out of Stock
                </Badge>
              )}
              {product.stock > 0 && product.stock <= 2 && (
                <Badge className="bg-destructive/80 text-destructive-foreground">
                  Only {product.stock} left!
                </Badge>
              )}
              {product.stock === 3 && (
                <Badge className="bg-orange-500 text-white">
                  3 more available
                </Badge>
              )}
              {product.stock > 3 && product.stock <= 5 && (
                <Badge className="bg-amber-500 text-white">
                  {product.stock} more available
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlistToggle}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isInWishlist(product.id)
                    ? 'bg-destructive text-destructive-foreground'
                    : 'bg-card/80 backdrop-blur-sm hover:bg-card text-foreground'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`}
                />
              </motion.button>
            </div>

            {/* Add to Cart Button */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <Button
                onClick={handleAddToCart}
                className="w-full gap-2"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-4 h-4" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {product.category}
            </p>
            <h3 className="font-heading font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-lg text-primary">
                ${product.price.toFixed(2)}
              </span>
              {isOnSale && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice!.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
