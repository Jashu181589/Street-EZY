import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  supplier: string;
  rating: number;
  image: string;
  inStock: boolean;
  discount?: number;
  originalPrice?: number;
  addedDate: string;
}

const Wishlist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "Fresh Tomatoes",
      price: 20,
      unit: "kg",
      supplier: "AgroMart Pvt. Ltd.",
      rating: 4.5,
      image: "/placeholder.svg",
      inStock: true,
      discount: 15,
      originalPrice: 24,
      addedDate: "2024-01-15"
    },
    {
      id: "2",
      name: "Organic Spinach",
      price: 35,
      unit: "kg",
      supplier: "GreenLeaf Farms",
      rating: 4.8,
      image: "/placeholder.svg",
      inStock: true,
      addedDate: "2024-01-12"
    },
    {
      id: "3",
      name: "Basmati Rice Premium",
      price: 65,
      unit: "kg",
      supplier: "RiceKing Ltd.",
      rating: 4.6,
      image: "/placeholder.svg",
      inStock: false,
      addedDate: "2024-01-10"
    },
    {
      id: "4",
      name: "Mixed Spices Pack",
      price: 450,
      unit: "pack",
      supplier: "SpiceWorld",
      rating: 4.7,
      image: "/placeholder.svg",
      inStock: true,
      discount: 20,
      originalPrice: 560,
      addedDate: "2024-01-08"
    },
    {
      id: "5",
      name: "Fresh Ginger",
      price: 40,
      unit: "kg",
      supplier: "FreshFarm Co.",
      rating: 4.4,
      image: "/placeholder.svg",
      inStock: true,
      addedDate: "2024-01-05"
    }
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (item: WishlistItem) => {
    // Add to cart logic here
    console.log("Added to cart:", item.name);
  };

  const filteredItems = wishlistItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inStockItems = filteredItems.filter(item => item.inStock);
  const outOfStockItems = filteredItems.filter(item => !item.inStock);
  const itemsOnSale = filteredItems.filter(item => item.discount);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-destructive" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
              <p className="text-muted-foreground">{wishlistItems.length} items saved for later</p>
            </div>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8 shadow-soft">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search your wishlist..."
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
                  <Button variant="outline" size="sm">
                    Sort by Price
                  </Button>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex gap-4 mt-4 text-sm">
                <span className="text-success">{inStockItems.length} In Stock</span>
                <span className="text-muted-foreground">{outOfStockItems.length} Out of Stock</span>
                <span className="text-secondary">{itemsOnSale.length} On Sale</span>
              </div>
            </CardContent>
          </Card>

          {wishlistItems.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-4">Save products you love for easy access later</p>
                <Button className="bg-gradient-primary">Browse Products</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Items on Sale Section */}
              {itemsOnSale.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-semibold">Items on Sale</h2>
                    <Badge variant="secondary" className="bg-gradient-secondary text-secondary-foreground">
                      {itemsOnSale.length} deals
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itemsOnSale.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="shadow-soft hover:shadow-medium transition-all duration-300 group">
                          <CardContent className="p-4">
                            <div className="relative mb-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                                onClick={() => removeFromWishlist(item.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                              {item.discount && (
                                <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                                  {item.discount}% OFF
                                </Badge>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.supplier}</p>
                              
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-primary">₹{item.price}</span>
                                <span className="text-sm">/{item.unit}</span>
                                {item.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ₹{item.originalPrice}
                                  </span>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary">★ {item.rating}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  Added {new Date(item.addedDate).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <Button
                                className="w-full bg-gradient-primary"
                                onClick={() => addToCart(item)}
                                disabled={!item.inStock}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Items Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">All Items</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`shadow-soft hover:shadow-medium transition-all duration-300 group ${
                        !item.inStock ? 'opacity-75' : ''
                      }`}>
                        <CardContent className="p-4">
                          <div className="relative mb-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              <Heart className="h-4 w-4 text-destructive fill-destructive" />
                            </Button>
                            {item.discount && (
                              <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                                {item.discount}% OFF
                              </Badge>
                            )}
                            {!item.inStock && (
                              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                <Badge variant="secondary" className="bg-background text-foreground">
                                  Out of Stock
                                </Badge>
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.supplier}</p>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-primary">₹{item.price}</span>
                              <span className="text-sm">/{item.unit}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ₹{item.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary">★ {item.rating}</Badge>
                              <span className="text-xs text-muted-foreground">
                                Added {new Date(item.addedDate).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <Button
                              className="w-full bg-gradient-primary"
                              onClick={() => addToCart(item)}
                              disabled={!item.inStock}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {filteredItems.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No items found</h2>
                    <p className="text-muted-foreground">Try adjusting your search criteria</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;