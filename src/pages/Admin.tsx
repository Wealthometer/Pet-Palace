"use client"

import { useEffect, useState } from "react"
import { useUser, useAuth } from "@clerk/clerk-react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Layout } from "../components/layout/Layout"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Textarea } from "../components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Plus, Trash2, Edit2, Loader } from "lucide-react"
import { toast } from "sonner"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  images: string[]
  featured: boolean
}

const Admin = () => {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "pets",
    stock: "",
    images: "",
    featured: false,
  })

  // Check if user is admin or has bypass key
  useEffect(() => {
    const adminKey = searchParams.get("admin")
    const isAdmin = user?.unsafeMetadata?.isAdmin === true
    const hasValidKey = adminKey === "petpalace-admin-2024"

    if (isLoaded && !user) {
      toast.error("Please log in to access admin panel")
      navigate("/login")
      return
    }

    if (isLoaded && !isAdmin && !hasValidKey) {
      toast.error("Access denied. Admin privileges required or valid admin key needed.")
      navigate("/")
    }
  }, [isLoaded, user, navigate, searchParams])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = await getToken()
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error("Failed to fetch products")
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
        toast.error("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    const adminKey = searchParams.get("admin")
    const isAdmin = user?.unsafeMetadata?.isAdmin === true
    const hasValidKey = adminKey === "petpalace-admin-2024"

    if (isLoaded && user && (isAdmin || hasValidKey)) {
      fetchProducts()
    }
  }, [isLoaded, user, getToken, searchParams])

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        images: product.images.join("\n"),
        featured: product.featured,
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "pets",
        stock: "",
        images: "",
        featured: false,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSaveProduct = async () => {
    try {
      const token = await getToken()
      const imageArray = formData.images
        .split("\n")
        .map(url => url.trim())
        .filter(url => url)

      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        images: imageArray,
        featured: formData.featured,
      }

      const url = editingProduct
        ? `${import.meta.env.VITE_API_URL}/admin/products/${editingProduct._id}`
        : `${import.meta.env.VITE_API_URL}/admin/products`

      const method = editingProduct ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Failed to save product")

      const updatedProduct = await response.json()

      if (editingProduct) {
        setProducts(products.map(p => (p._id === updatedProduct._id ? updatedProduct : p)))
        toast.success("Product updated successfully")
      } else {
        setProducts([...products, updatedProduct])
        toast.success("Product created successfully")
      }

      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error saving product:", error)
      toast.error("Failed to save product")
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const token = await getToken()
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Failed to delete product")

      setProducts(products.filter(p => p._id !== id))
      toast.success("Product deleted successfully")
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Failed to delete product")
    }
  }

  if (!isLoaded || !user?.unsafeMetadata?.isAdmin) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader className="animate-spin" size={32} />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your products inventory</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus size={18} />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Premium Dog Food"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Product description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={e => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground"
                  >
                    <option value="pets">Pets</option>
                    <option value="food">Food</option>
                    <option value="toys">Toys</option>
                    <option value="accessories">Accessories</option>
                    <option value="health">Health</option>
                    <option value="beds">Beds</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="images">Image URLs (one per line)</Label>
                  <Textarea
                    id="images"
                    value={formData.images}
                    onChange={e => setFormData({ ...formData, images: e.target.value })}
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProduct}>
                    {editingProduct ? "Update" : "Create"} Product
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Products</CardTitle>
                <CardDescription>Total: {products.length} products</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader className="animate-spin" />
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No products yet. Create your first product to get started.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Featured</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map(product => (
                          <TableRow key={product._id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge
                                variant={product.stock > 5 ? "secondary" : "outline"}
                                className={product.stock === 0 ? "bg-destructive" : ""}
                              >
                                {product.stock}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {product.featured ? (
                                <Badge className="bg-primary">Featured</Badge>
                              ) : (
                                <Badge variant="outline">-</Badge>
                              )}
                            </TableCell>
                            <TableCell className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenDialog(product)}
                                className="gap-1"
                              >
                                <Edit2 size={16} />
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteProduct(product._id)}
                                className="gap-1"
                              >
                                <Trash2 size={16} />
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Access Control</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This admin panel is protected and can only be accessed by users with admin privileges.
                  </p>
                  <div className="bg-accent/50 border border-border rounded-lg p-4">
                    <p className="text-sm">
                      <strong>Admin User:</strong> {user?.primaryEmailAddress?.emailAddress}
                    </p>
                    <p className="text-sm mt-2">
                      <strong>User ID:</strong> {user?.id}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default Admin
