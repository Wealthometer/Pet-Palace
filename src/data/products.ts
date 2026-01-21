import type { ComponentType, SVGProps } from 'react';
import { Dog, Bone, Gamepad, Gift, Heart, Bed, PawPrint, PawPrintIcon } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  description: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  tags: string[];
  featured: boolean;
  createdAt: string;
}

export type CategoryIcon = ComponentType<SVGProps<SVGSVGElement>>;

export const categories: { id: string; name: string; icon: CategoryIcon }[] = [
  { id: 'pets', name: 'Pets', icon: PawPrint },
  { id: 'food', name: 'Pet Food', icon: Bone },
  { id: 'toys', name: 'Toys', icon: Gamepad },
  { id: 'accessories', name: 'Accessories', icon: Gift },
  { id: 'health', name: 'Health & Care', icon: Heart },
  { id: 'beds', name: 'Beds & Furniture', icon: Bed },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Golden Retriever Puppy',
    price: 1200,
    category: 'pets',
    subcategory: 'dogs',
    description: 'Adorable Golden Retriever puppy, 8 weeks old. Vaccinated and dewormed. Perfect family companion with a gentle, friendly temperament. Comes with health certificate and initial vet checkup.',
    images: [
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800',
      'https://images.unsplash.com/photo-1625316708582-7c38734d5db0?w=800',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
    ],
    stock: 3,
    rating: 4.9,
    reviews: 42,
    tags: ['puppy', 'dog', 'golden retriever', 'family pet'],
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Persian Kitten',
    price: 800,
    category: 'pets',
    subcategory: 'cats',
    description: 'Beautiful white Persian kitten with blue eyes. 10 weeks old, litter trained, and very affectionate. Perfect for indoor living.',
    images: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800',
    ],
    stock: 2,
    rating: 4.8,
    reviews: 35,
    tags: ['kitten', 'cat', 'persian', 'white cat'],
    featured: true,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Premium Dog Food - Chicken & Rice',
    price: 45,
    originalPrice: 55,
    category: 'food',
    subcategory: 'dog-food',
    description: 'High-quality dog food made with real chicken and wholesome grains. Formulated for adult dogs of all breeds. 15kg bag.',
    images: [
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800',
    ],
    stock: 50,
    rating: 4.7,
    reviews: 128,
    tags: ['dog food', 'premium', 'chicken'],
    featured: false,
    createdAt: '2024-01-05',
  },
  {
    id: '4',
    name: 'Interactive Cat Toy Set',
    price: 25,
    category: 'toys',
    subcategory: 'cat-toys',
    description: 'Set of 10 interactive toys including feather wands, mice, and balls. Keeps your cat entertained for hours.',
    images: [
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800',
    ],
    stock: 75,
    rating: 4.6,
    reviews: 89,
    tags: ['cat toy', 'interactive', 'set'],
    featured: true,
    createdAt: '2024-01-12',
  },
  {
    id: '5',
    name: 'French Bulldog Puppy',
    price: 2500,
    category: 'pets',
    subcategory: 'dogs',
    description: 'Rare blue French Bulldog puppy. AKC registered, 12 weeks old. Excellent bloodline with champion parents.',
    images: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    ],
    stock: 1,
    rating: 5.0,
    reviews: 15,
    tags: ['puppy', 'french bulldog', 'rare', 'blue'],
    featured: true,
    createdAt: '2024-01-14',
  },
  {
    id: '6',
    name: 'Orthopedic Dog Bed - Large',
    price: 89,
    originalPrice: 120,
    category: 'beds',
    subcategory: 'dog-beds',
    description: 'Memory foam orthopedic bed for large dogs. Waterproof liner, removable washable cover. Perfect for senior dogs or dogs with joint issues.',
    images: [
      'https://images.unsplash.com/photo-1567612529009-afe25813a308?w=800',
    ],
    stock: 20,
    rating: 4.8,
    reviews: 67,
    tags: ['dog bed', 'orthopedic', 'large', 'memory foam'],
    featured: false,
    createdAt: '2024-01-08',
  },
  {
    id: '7',
    name: 'Colorful Parakeet Pair',
    price: 75,
    category: 'pets',
    subcategory: 'birds',
    description: 'Bonded pair of healthy parakeets. Various colors available. Great for beginners, these social birds love interaction.',
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
    ],
    stock: 8,
    rating: 4.5,
    reviews: 23,
    tags: ['bird', 'parakeet', 'pair', 'colorful'],
    featured: false,
    createdAt: '2024-01-11',
  },
  {
    id: '8',
    name: 'Adjustable Dog Harness',
    price: 35,
    category: 'accessories',
    subcategory: 'dog-accessories',
    description: 'No-pull adjustable harness with reflective strips. Comfortable padded design. Available in multiple sizes and colors.',
    images: [
      'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800',
    ],
    stock: 100,
    rating: 4.7,
    reviews: 156,
    tags: ['dog harness', 'adjustable', 'no-pull', 'reflective'],
    featured: true,
    createdAt: '2024-01-09',
  },
  {
    id: '9',
    name: 'Cat Scratching Tower',
    price: 65,
    category: 'toys',
    subcategory: 'cat-furniture',
    description: 'Multi-level cat tree with scratching posts, hammock, and hideaway. Covered in soft plush and natural sisal rope.',
    images: [
      'https://images.unsplash.com/photo-1545529468-42764ef8c85f?w=800',
    ],
    stock: 15,
    rating: 4.6,
    reviews: 78,
    tags: ['cat tree', 'scratching post', 'cat furniture'],
    featured: false,
    createdAt: '2024-01-07',
  },
  {
    id: '10',
    name: 'Pet Vitamin Supplements',
    price: 28,
    category: 'health',
    subcategory: 'supplements',
    description: 'Complete multivitamin for dogs and cats. Supports immune system, coat health, and joint function. 90 chewable tablets.',
    images: [
      'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800',
    ],
    stock: 45,
    rating: 4.4,
    reviews: 92,
    tags: ['vitamins', 'supplements', 'health', 'pet care'],
    featured: false,
    createdAt: '2024-01-06',
  },
  {
    id: '11',
    name: 'Labrador Retriever Puppy',
    price: 950,
    category: 'pets',
    subcategory: 'dogs',
    description: 'Chocolate Labrador puppy, 10 weeks old. Excellent temperament, great with kids. Comes with first vaccinations.',
    images: [
      'https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=800',
    ],
    stock: 2,
    rating: 4.9,
    reviews: 31,
    tags: ['puppy', 'labrador', 'chocolate', 'family dog'],
    featured: true,
    createdAt: '2024-01-13',
  },
  {
    id: '12',
    name: 'Premium Cat Food - Salmon',
    price: 38,
    category: 'food',
    subcategory: 'cat-food',
    description: 'Grain-free cat food with real salmon. Rich in omega fatty acids for healthy skin and coat. 5kg bag.',
    images: [
      'https://images.unsplash.com/photo-1615750824143-71a3e8435626?w=800',
    ],
    stock: 60,
    rating: 4.7,
    reviews: 104,
    tags: ['cat food', 'salmon', 'grain-free', 'premium'],
    featured: false,
    createdAt: '2024-01-04',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
