import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ShoppingCart, Heart, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import ProductCard from "@/components/cards/ProductCard";
import GroupBuyingCard from "@/components/cards/GroupBuyingCard";
import AnalyticsChart from "@/components/charts/AnalyticsChart";

const VendorDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const products = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      price: 20,
      unit: "kg",
      supplier: "AgroMart Pvt. Ltd.",
      rating: 4.5,
      stock: 150,
      image: "/placeholder.svg",
      discount: 15
    },
    {
      id: "2", 
      name: "Red Onions",
      price: 18,
      unit: "kg",
      supplier: "FreshFarm Co.",
      rating: 4.8,
      stock: 200,
      image: "/placeholder.svg",
      discount: 10
    },
    {
      id: "3",
      name: "Basmati Rice",
      price: 40,
      unit: "kg", 
      supplier: "GrainMart Ltd.",
      rating: 4.7,
      stock: 80,
      image: "/placeholder.svg",
      discount: 20
    }
  ];

  const groupDeals = [
    {
      id: "1",
      title: "Bulk Onions Deal",
      targetAmount: 4000,
      currentAmount: 2500,
      participants: 15,
      timeLeft: "2 days",
      savings: 25,
      product: "Red Onions - 50kg",
      pricePerUnit: 15
    },
    {
      id: "2",
      title: "Rice Wholesale",
      targetAmount: 3000,
      currentAmount: 1500,
      participants: 8,
      timeLeft: "5 days",
      savings: 30,
      product: "Basmati Rice - 25kg",
      pricePerUnit: 35
    }
  ];

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
              Welcome back, Ramesh! 
            </h1>
            <p className="text-muted-foreground">
              Find the best deals for your street business
            </p>
          </div>

          {/* Search & AI Recommendations */}
          <Card className="mb-8 shadow-soft">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for products or ask AI: 'Cheapest onions near me'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button size="sm" className="bg-gradient-primary">
                    AI Search
                  </Button>
                </div>
              </div>
              
              {/* Quick AI Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  Cheapest onions near me
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  Best bulk deals on spices
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  Fresh vegetables under ₹25/kg
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Main Dashboard Content */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="group-buying">Group Buying</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="ai-deals">AI Deals</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="group-buying" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupDeals.map((deal) => (
                  <GroupBuyingCard key={deal.id} deal={deal} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="shadow-soft">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Weekly Savings</CardTitle>
                    <TrendingUp className="h-4 w-4 text-success" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">₹2,540</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last week
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="shadow-soft">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Orders This Month</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent">24</div>
                    <p className="text-xs text-muted-foreground">
                      +8 from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Group Deals Joined</CardTitle>
                    <Users className="h-4 w-4 text-secondary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-secondary">7</div>
                    <p className="text-xs text-muted-foreground">
                      3 active deals
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                    <Heart className="h-4 w-4 text-destructive" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      5 items on sale
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <AnalyticsChart />
            </TabsContent>

            <TabsContent value="ai-deals" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    AI Recommended Deals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-primary rounded-lg text-primary-foreground">
                      <h3 className="font-semibold">🔥 Hot Deal Alert!</h3>
                      <p className="text-sm opacity-90">
                        Based on your purchase history, tomatoes are 20% cheaper at FreshFarm Co. today!
                      </p>
                      <Button variant="secondary" size="sm" className="mt-2">
                        View Deal
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-gradient-secondary rounded-lg text-secondary-foreground">
                      <h3 className="font-semibold">📊 Smart Insight</h3>
                      <p className="text-sm opacity-90">
                        Rice prices are expected to drop 15% next week. Consider waiting for bulk purchases.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-accent rounded-lg text-accent-foreground">
                      <h3 className="font-semibold">🤝 Group Opportunity</h3>
                      <p className="text-sm opacity-90">
                        Join the onion bulk deal - only 2 more vendors needed to unlock 25% savings!
                      </p>
                      <Button variant="secondary" size="sm" className="mt-2">
                        Join Now
                      </Button>
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

export default VendorDashboard;