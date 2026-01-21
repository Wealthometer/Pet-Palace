"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, ShoppingBag, Mail } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { apiClient } from "../../config/api"
import { useAuthContext } from "../../context/AuthContext"

export const AdminDashboard = () => {
  const { token } = useAuthContext()
  const [orders, setOrders] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (token) {
      loadAdminData()
    }
  }, [token])

  const loadAdminData = async () => {
    setIsLoading(true)
    try {
      const [ordersRes, messagesRes] = await Promise.all([
        apiClient.get("/admin/orders", token),
        apiClient.get("/admin/messages", token),
      ])

      setOrders(ordersRes.data || [])
      setMessages(messagesRes.data || [])
    } catch (error) {
      console.error("Failed to load admin data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    try {
      await apiClient.put(`/admin/orders/${orderId}/status`, { status }, token)
      await loadAdminData()
    } catch (error) {
      console.error("Failed to update order:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-3xl font-bold mb-8"
      >
        Admin Dashboard
      </motion.h1>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="orders" className="gap-2">
            <ShoppingBag className="w-4 h-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="messages" className="gap-2">
            <Mail className="w-4 h-4" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-heading font-semibold text-xl mb-4">Recent Orders</h2>
              {orders.length === 0 ? (
                <p className="text-muted-foreground">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium">Order #{order._id.slice(-8)}</p>
                          <p className="text-sm text-muted-foreground">${order.totalPrice.toFixed(2)}</p>
                        </div>
                        <select
                          value={order.status}
                          onChange={(e) => handleOrderStatusUpdate(order._id, e.target.value)}
                          className="px-3 py-1 border border-border rounded text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-heading font-semibold text-xl mb-4">Contact Messages</h2>
              {messages.length === 0 ? (
                <p className="text-muted-foreground">No messages</p>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg._id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{msg.name}</p>
                          <p className="text-sm text-muted-foreground">{msg.email}</p>
                        </div>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">{msg.status}</span>
                      </div>
                      <p className="font-medium text-sm mb-1">{msg.subject}</p>
                      <p className="text-sm text-muted-foreground">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <p className="text-muted-foreground">Analytics coming soon...</p>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
