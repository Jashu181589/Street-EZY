import { motion } from "framer-motion";
import { ArrowRight, Search, Users, TrendingDown, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";

const FloatingCart = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Smarter Buying for 
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Street Vendors
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Connect with verified suppliers, join group buying deals, and save up to 40% with AI-powered recommendations.
              </p>
              
              {/* Search Bar */}
              <div className="flex gap-3 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search for products... 'onions near me'"
                    className="pl-10 h-12 bg-white/95 backdrop-blur-sm"
                  />
                </div>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Zap className="h-5 w-5 mr-2" />
                  AI Search
                </Button>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/onboarding">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Sign Up as Vendor
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/onboarding">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Sign Up as Supplier
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            {/* 3D Cart Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-96 w-full"
            >
              <FloatingCart />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How StreetEzy Works</h2>
            <p className="text-xl text-muted-foreground">Three simple steps to smarter shopping</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up & Browse",
                description: "Create your account and explore thousands of products from verified suppliers",
                icon: Users
              },
              {
                step: "2", 
                title: "Join Group Deals",
                description: "Collaborate with other vendors to unlock bulk pricing and amazing discounts",
                icon: TrendingDown
              },
              {
                step: "3",
                title: "Save Money",
                description: "Enjoy up to 40% savings and grow your business with better margins",
                icon: Zap
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="text-center p-8 shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardContent>
                    <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Vendors" },
              { number: "500+", label: "Suppliers" },
              { number: "₹2.5Cr", label: "Savings Generated" },
              { number: "50+", label: "Cities" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">StreetEzy</span>
            </div>
            <p className="text-muted-foreground">
              Empowering street vendors with smart technology and better deals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
