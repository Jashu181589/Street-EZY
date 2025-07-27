import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Package, TrendingUp, DollarSign, Eye, Edit, Trash2, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import AnalyticsChart from "@/components/charts/AnalyticsChart";

const AdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const vendors = [
    {
      id: "V001",
      name: "Ramesh Kumar",
      email: "ramesh@email.com",
      phone: "+91 98765 43210",
      location: "Hyderabad",
      joinDate: "2024-01-15",
      orders: 24,
      totalSpent: 15420,
      status: "active"
    },
    {
      id: "V002",
      name: "Priya Stores",
      email: "priya@email.com", 
      phone: "+91 87654 32109",
      location: "Chennai",
      joinDate: "2024-01-10",
      orders: 18,
      totalSpent: 12350,
      status: "active"
    },
    {
      id: "V003",
      name: "Raj Vegetables",
      email: "raj@email.com",
      phone: "+91 76543 21098",
      location: "Mumbai",
      joinDate: "2024-01-08",
      orders: 31,
      totalSpent: 22180,
      status: "inactive"
    }
  ];

  const suppliers = [
    {
      id: "S001",
      name: "AgroMart Pvt. Ltd.",
      email: "contact@agromart.com",
      phone: "+91 98765 12345",
      location: "Delhi",
      joinDate: "2023-12-01",
      products: 45,
      revenue: 125000,
      rating: 4.8,
      status: "verified"
    },
    {
      id: "S002",
      name: "FreshFarm Co.",
      email: "info@freshfarm.com",
      phone: "+91 87654 23456",
      location: "Punjab",
      joinDate: "2023-11-15",
      products: 32,
      revenue: 89500,
      rating: 4.5,
      status: "verified"
    },
    {
      id: "S003",
      name: "GrainMart Ltd.",
      email: "support@grainmart.com",
      phone: "+91 76543 34567",
      location: "Haryana",
      joinDate: "2023-10-20",
      products: 28,
      revenue: 67200,
      rating: 4.2,
      status: "pending"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-success text-success-foreground",
      inactive: "bg-muted text-muted-foreground",
      verified: "bg-success text-success-foreground",
      pending: "bg-warning text-warning-foreground",
      suspended: "bg-destructive text-destructive-foreground"
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage users, monitor platform activity, and track performance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
                <div className="flex gap-4 mt-2 text-xs">
                  <span className="text-success">892 Vendors</span>
                  <span className="text-accent">355 Suppliers</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">₹2,45,680</div>
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
                <div className="text-2xl font-bold text-accent">348</div>
                <p className="text-xs text-muted-foreground">
                  156 pending, 192 in transit
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">+24%</div>
                <p className="text-xs text-muted-foreground">
                  User acquisition this month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="vendors" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="vendors" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <CardTitle>Vendor Management</CardTitle>
                    <div className="flex gap-2 w-full md:w-auto">
                      <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search vendors..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-gradient-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Vendor
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vendor ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vendors.map((vendor) => (
                        <TableRow key={vendor.id}>
                          <TableCell className="font-medium">{vendor.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{vendor.name}</div>
                              <div className="text-sm text-muted-foreground">{vendor.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{vendor.location}</TableCell>
                          <TableCell>{vendor.orders}</TableCell>
                          <TableCell>₹{vendor.totalSpent.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(vendor.status)}>
                              {vendor.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
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

            <TabsContent value="suppliers" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Supplier Management</CardTitle>
                    <Button className="bg-gradient-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Supplier
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier ID</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">{supplier.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{supplier.name}</div>
                              <div className="text-sm text-muted-foreground">{supplier.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{supplier.location}</TableCell>
                          <TableCell>{supplier.products}</TableCell>
                          <TableCell>₹{supplier.revenue.toLocaleString()}</TableCell>
                          <TableCell>★ {supplier.rating}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(supplier.status)}>
                              {supplier.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Top Performing Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Tomatoes", sales: 156, revenue: 31200 },
                        { name: "Onions", sales: 142, revenue: 25560 },
                        { name: "Rice", sales: 89, revenue: 35600 },
                        { name: "Potatoes", sales: 78, revenue: 15600 }
                      ].map((item, index) => (
                        <div key={item.name} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.sales} orders</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">₹{item.revenue.toLocaleString()}</div>
                            <div className="text-sm text-success">#{index + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: "New vendor registered", user: "Amit Sharma", time: "2 minutes ago" },
                        { action: "Supplier verified", user: "OrganicFarms Ltd.", time: "5 minutes ago" },
                        { action: "Large order placed", user: "₹15,000 order", time: "8 minutes ago" },
                        { action: "Group deal completed", user: "Onion bulk deal", time: "12 minutes ago" }
                      ].map((activity, index) => (
                        <div key={index} className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-sm">{activity.action}</div>
                            <div className="text-sm text-muted-foreground">{activity.user}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {activity.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Commission Settings</h3>
                      <div>
                        <label className="text-sm font-medium">Vendor Commission (%)</label>
                        <Input type="number" defaultValue="2.5" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Supplier Commission (%)</label>
                        <Input type="number" defaultValue="3.0" className="mt-1" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Approval Settings</h3>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Auto-approve vendors</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" />
                          <span className="text-sm">Auto-approve suppliers</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Require document verification</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="bg-gradient-primary">Save Settings</Button>
                    <Button variant="outline">Reset to Default</Button>
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

export default AdminPanel;