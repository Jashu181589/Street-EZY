import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, User, Building, MapPin, Phone, Mail, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<"vendor" | "supplier" | null>(null);
  const [formData, setFormData] = useState({
    // Personal/Business Info
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    
    // Business Info (for suppliers)
    businessName: "",
    gstNumber: "",
    businessType: "",
    description: "",
    
    // Preferences
    categories: [] as string[],
    deliveryRadius: "",
    minOrderValue: ""
  });

  const steps = [
    {
      title: "Choose Your Role",
      description: "Are you a street vendor looking for suppliers or a supplier wanting to sell?"
    },
    {
      title: "Personal Information", 
      description: "Tell us about yourself"
    },
    {
      title: userType === "supplier" ? "Business Details" : "Business Preferences",
      description: userType === "supplier" ? "Your business information" : "Your shopping preferences"
    },
    {
      title: "All Set!",
      description: "Welcome to StreetEzy"
    }
  ];

  const productCategories = [
    "Vegetables",
    "Fruits", 
    "Grains & Cereals",
    "Spices & Condiments",
    "Dairy Products",
    "Meat & Poultry",
    "Snacks & Beverages",
    "Household Items"
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Save user data and redirect to appropriate dashboard
    if (userType === "vendor") {
      navigate("/vendor/dashboard");
    } else {
      navigate("/supplier/dashboard");
    }
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category];
    
    setFormData({ ...formData, categories: newCategories });
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-strong backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Welcome to StreetEzy
            </CardTitle>
            <div className="flex justify-center mt-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                    index <= currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h2>
              <p className="text-muted-foreground">{steps[currentStep].description}</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Step 0: Role Selection */}
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-300 ${
                          userType === "vendor" ? 'ring-2 ring-primary shadow-medium' : 'hover:shadow-soft'
                        }`}
                        onClick={() => setUserType("vendor")}
                      >
                        <CardContent className="p-6 text-center">
                          <User className="h-12 w-12 mx-auto mb-4 text-primary" />
                          <h3 className="text-lg font-semibold mb-2">Street Vendor</h3>
                          <p className="text-sm text-muted-foreground">
                            I want to buy products at wholesale prices and join group buying deals
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-300 ${
                          userType === "supplier" ? 'ring-2 ring-primary shadow-medium' : 'hover:shadow-soft'
                        }`}
                        onClick={() => setUserType("supplier")}
                      >
                        <CardContent className="p-6 text-center">
                          <Building className="h-12 w-12 mx-auto mb-4 text-secondary" />
                          <h3 className="text-lg font-semibold mb-2">Supplier</h3>
                          <p className="text-sm text-muted-foreground">
                            I want to sell my products to street vendors and businesses
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                )}

                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                      />
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Complete Address *</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your complete address"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Business Details/Preferences */}
                {currentStep === 2 && userType === "supplier" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          placeholder="Your business name"
                          value={formData.businessName}
                          onChange={(e) => updateFormData("businessName", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gstNumber">GST Number</Label>
                        <Input
                          id="gstNumber"
                          placeholder="GST Registration Number"
                          value={formData.gstNumber}
                          onChange={(e) => updateFormData("gstNumber", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Business Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell us about your business and products"
                        value={formData.description}
                        onChange={(e) => updateFormData("description", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Product Categories You Deal In *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {productCategories.map((category) => (
                          <label
                            key={category}
                            className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                              formData.categories.includes(category)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'hover:bg-muted border-border'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.categories.includes(category)}
                              onChange={() => handleCategoryToggle(category)}
                              className="sr-only"
                            />
                            <span className="text-sm">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && userType === "vendor" && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label>What products are you interested in? *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {productCategories.map((category) => (
                          <label
                            key={category}
                            className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                              formData.categories.includes(category)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'hover:bg-muted border-border'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.categories.includes(category)}
                              onChange={() => handleCategoryToggle(category)}
                              className="sr-only"
                            />
                            <span className="text-sm">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="deliveryRadius">Preferred Delivery Distance</Label>
                        <Input
                          id="deliveryRadius"
                          placeholder="e.g., 10 km"
                          value={formData.deliveryRadius}
                          onChange={(e) => updateFormData("deliveryRadius", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="minOrderValue">Typical Order Value</Label>
                        <Input
                          id="minOrderValue"
                          placeholder="e.g., ₹2000"
                          value={formData.minOrderValue}
                          onChange={(e) => updateFormData("minOrderValue", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Success */}
                {currentStep === 3 && (
                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto"
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Welcome to StreetEzy! 🎉
                      </h3>
                      <p className="text-muted-foreground">
                        Your account has been set up successfully. Start exploring the best deals and connect with {userType === "vendor" ? "suppliers" : "vendors"} in your area.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">What's next?</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {userType === "vendor" ? (
                          <>
                            <li>• Browse products from verified suppliers</li>
                            <li>• Join group buying deals for better prices</li>
                            <li>• Use AI assistant for smart recommendations</li>
                          </>
                        ) : (
                          <>
                            <li>• Add your products to the marketplace</li>
                            <li>• Connect with street vendors in your area</li>
                            <li>• Track your orders and revenue</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={currentStep === 0 && !userType}
                  className="bg-gradient-primary flex items-center"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  className="bg-gradient-primary flex items-center"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Onboarding;