import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, Menu, User, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logoImage from "@/assets/streetezy-logo.png";

const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Vendor", href: "/vendor/dashboard" },
    { name: "Supplier", href: "/supplier/dashboard" },
    { name: "AI Assistant", href: "/ai" },
    { name: "Admin", href: "/admin" }
  ];

  return (
    <header className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="StreetEzy Logo" 
              className="w-10 h-10 rounded-xl shadow-sm"
            />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              StreetEzy
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Link to="/wishlist">
              <Button variant="outline" size="icon" className="relative">
                <Heart className="h-4 w-4" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs font-medium bg-primary text-primary-foreground rounded-full min-w-[16px]">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs font-medium bg-primary text-primary-foreground rounded-full min-w-[16px]">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
            </Button>

            <Button className="md:hidden" variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;