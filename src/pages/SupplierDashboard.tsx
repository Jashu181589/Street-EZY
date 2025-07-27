import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Eye, Edit, Trash2, Package, TrendingUp, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import AnalyticsChart from "@/components/charts/AnalyticsChart";

const SupplierDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const orders = [
    {
      id: "ORD-001",
      vendor: "Ramesh Kumar",
      items: "Tomatoes (50kg), Onions (30kg)",
      amount: 1250,
      status: "pending",
      date: "2024-01-20",
      location: "Hyderabad"
    },
    {
      id: "ORD-002", 
      vendor: "Priya Stores",
      items: "Rice (100kg)",
      amount: 4000,
      status: "shipped",
      date: "2024-01-19",
      location: "Chennai"
    },
    {
      id: "ORD-003",
      vendor: "Raj Vegetables", 
      items: "Mixed Spices (10kg)",
      amount: 2500,
      status: "delivered",
      date: "2024-01-18",
      location: "Mumbai"
    }
  ];

  const products = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      category: "Vegetables",
      price: 20,
      stock: 500,
      sales: 156,
      status: "active"
    },
    {
      id: "2",
      name: "Red Onions", 
      category: "Vegetables",
      price: 18,
      stock: 300,
      sales: 89,
      status: "active"
    },
    {
      id: "3",
      name: "Basmati Rice",
      category: "Grains",
      price: 40,
      stock: 200,
      sales: 67,
      status: "low_stock"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-warning text-warning-foreground",
      shipped: "bg-info text-info-foreground", 
      delivered: "bg-success text-success-foreground",
      active: "bg-success text-success-foreground",
      low_stock: "bg-warning text-warning-foreground",
      out_of_stock: "bg-destructive text-destructive-foreground"
    };
    return colors[status as keyof typeof colors] || "bg-muted";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Supplier Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your products and track orders
              </p>
            </div>
            <Button className="bg-gradient-primary mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">₹45,250</div>
                <p className="text-xs text-muted-foreground">
                  +18% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <Package className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">12</div>
                <p className="text-xs text-muted-foreground">
                  3 pending shipment
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
                <TrendingUp className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">28</div>
                <p className="text-xs text-muted-foreground">
                  5 low stock
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendor Partners</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  +12 this month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <CardTitle>Order Management</CardTitle>
                    <div className="flex gap-2 w-full md:w-auto">
                      <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search orders..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.vendor}</TableCell>
                          <TableCell className="max-w-48 truncate">{order.items}</TableCell>
                          <TableCell>₹{order.amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Product Management</CardTitle>
                    <Button className="bg-gradient-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price (per kg)</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>₹{product.price}</TableCell>
                          <TableCell>{product.stock} kg</TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(product.status)}>
                              {product.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsChart />
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    AI Business Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-primary rounded-lg text-primary-foreground">
                      <h3 className="font-semibold">📈 Demand Spike</h3>
                      <p className="text-sm opacity-90">
                        Tomato demand increased 25% this week. Consider raising prices by 10-15%.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-secondary rounded-lg text-secondary-foreground">
                      <h3 className="font-semibold">🎯 Market Opportunity</h3>
                      <p className="text-sm opacity-90">
                        Low competition for organic rice in your area. 3 vendors actively searching.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-accent rounded-lg text-accent-foreground">
                      <h3 className="font-semibold">⚠️ Stock Alert</h3>
                      <p className="text-sm opacity-90">
                        Onion stocks running low. Historical data suggests restocking within 2 days.
                      </p>
                    </div>

                    <div className="p-4 border border-border rounded-lg">
                      <h3 className="font-semibold">🤖 AI Recommendation</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on vendor behavior, bundle tomatoes with onions for 20% higher sales.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default SupplierDashboard;