import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Trash2, ArrowRight, ShoppingCart, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  supplier: string;
  image: string;
  maxQuantity: number;
  discount?: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Fresh Tomatoes",
      price: 20,
      quantity: 5,
      unit: "kg",
      supplier: "AgroMart Pvt. Ltd.",
      image: "/placeholder.svg",
      maxQuantity: 50,
      discount: 15
    },
    {
      id: "2",
      name: "Red Onions",
      price: 18,
      quantity: 10,
      unit: "kg", 
      supplier: "FreshFarm Co.",
      image: "/placeholder.svg",
      maxQuantity: 100,
      discount: 10
    },
    {
      id: "3",
      name: "Basmati Rice",
      price: 40,
      quantity: 2,
      unit: "kg",
      supplier: "GrainMart Ltd.",
      image: "/placeholder.svg",
      maxQuantity: 25
    }
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number} | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    const validPromoCodes = {
      "SAVE10": 10,
      "BULK15": 15,
      "FIRST20": 20
    };

    const discount = validPromoCodes[promoCode.toUpperCase() as keyof typeof validPromoCodes];
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount });
      setPromoCode("");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const discountAmount = item.discount ? (itemTotal * item.discount) / 100 : 0;
    return sum + (itemTotal - discountAmount);
  }, 0);

  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const deliveryFee = 50;
  const total = subtotal - promoDiscount + deliveryFee;

  const originalTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = originalTotal - total + deliveryFee;

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
            <ShoppingCart className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
              <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-4">Start shopping to add items to your cart</p>
                <Button className="bg-gradient-primary">Browse Products</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.supplier}</p>
                                {item.discount && (
                                  <Badge variant="secondary" className="mt-1">
                                    <Percent className="h-3 w-3 mr-1" />
                                    {item.discount}% OFF
                                  </Badge>
                                )}
                              </div>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                
                                <span className="text-lg font-medium min-w-[60px] text-center">
                                  {item.quantity} {item.unit}
                                </span>
                                
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.maxQuantity}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="text-right">
                                {item.discount && (
                                  <div className="text-sm text-muted-foreground line-through">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                  </div>
                                )}
                                <div className="text-lg font-bold">
                                  ₹{(item.price * item.quantity * (1 - (item.discount || 0) / 100)).toFixed(2)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  ₹{item.price}/{item.unit}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="shadow-soft sticky top-8">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Promo Code */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Promo Code</label>
                      {appliedPromo ? (
                        <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                          <div>
                            <span className="text-sm font-medium text-success">{appliedPromo.code}</span>
                            <p className="text-xs text-success/80">{appliedPromo.discount}% discount applied</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={removePromoCode}
                            className="text-success border-success hover:bg-success/10"
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                          />
                          <Button
                            variant="outline"
                            onClick={applyPromoCode}
                            disabled={!promoCode.trim()}
                          >
                            Apply
                          </Button>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      
                      {promoDiscount > 0 && (
                        <div className="flex justify-between text-success">
                          <span>Promo Discount ({appliedPromo?.discount}%)</span>
                          <span>-₹{promoDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>₹{deliveryFee}</span>
                      </div>
                      
                      {totalSavings > 0 && (
                        <div className="flex justify-between text-success font-medium">
                          <span>Total Savings</span>
                          <span>₹{totalSavings.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>

                    <Button className="w-full bg-gradient-primary" size="lg">
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        Secure checkout powered by Razorpay
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Suggested Items */}
                <Card className="shadow-soft mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">You might also like</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "Green Chillies", price: 25, unit: "kg" },
                      { name: "Coriander Leaves", price: 15, unit: "bunch" },
                      { name: "Ginger", price: 30, unit: "kg" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">₹{item.price}/{item.unit}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;