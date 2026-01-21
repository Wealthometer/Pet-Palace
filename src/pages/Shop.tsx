import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/products/ProductGrid';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { products, categories } from '../data/products';

const ITEMS_PER_PAGE = 8;

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Filter by price range
    if (priceRange.min) {
      result = result.filter(p => p.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(p => p.price <= parseFloat(priceRange.max));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [searchQuery, selectedCategories, sortBy, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setCurrentPage(1);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Search</Label>
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Categories */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Categories</Label>
        <div className="space-y-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <label
                htmlFor={category.id}
                className="text-sm cursor-pointer flex items-center gap-2"
              >
                <Icon className="text-primary" size={18} />
                {category.name}
              </label>
            </div>
            )
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Price Range</Label>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={e => {
              setPriceRange(prev => ({ ...prev, min: e.target.value }));
              setCurrentPage(1);
            }}
            className="w-24"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={e => {
              setPriceRange(prev => ({ ...prev, max: e.target.value }));
              setCurrentPage(1);
            }}
            className="w-24"
          />
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="bg-accent/30 py-8">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2"
          >
            Shop All Products
          </motion.h1>
          <p className="text-muted-foreground">
            Discover our complete collection of pets and supplies
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold text-lg">Filters</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-muted-foreground">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2">
                      <SlidersHorizontal className="w-4 h-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={paginatedProducts} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
