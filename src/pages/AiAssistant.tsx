import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Search, TrendingUp, Users, ShoppingCart } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  productCards?: Array<{
    id: string;
    name: string;
    price: number;
    supplier: string;
    rating: number;
  }>;
}

const AnimatedAssistant = () => {
  return (
    <div className="w-24 h-24 mx-auto mb-6">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh scale={2}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#10b981"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
};

const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI shopping assistant. I can help you find the best deals, predict market prices, and connect you with suppliers. What can I help you with today?",
      timestamp: new Date(),
      suggestions: [
        "Show cheapest suppliers for onions",
        "Best group deals near me", 
        "Predict tomato prices next week",
        "Find organic rice suppliers"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    {
      icon: Search,
      label: "Find Suppliers",
      description: "Discover verified suppliers in your area",
      color: "bg-gradient-primary"
    },
    {
      icon: TrendingUp,
      label: "Price Analysis", 
      description: "Get AI-powered price predictions",
      color: "bg-gradient-secondary"
    },
    {
      icon: Users,
      label: "Group Deals",
      description: "Join or create group buying opportunities",
      color: "bg-gradient-accent"
    },
    {
      icon: ShoppingCart,
      label: "Smart Cart",
      description: "Optimize your purchase decisions",
      color: "bg-primary"
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        productCards: inputMessage.toLowerCase().includes('onion') ? [
          {
            id: '1',
            name: 'Red Onions',
            price: 15,
            supplier: 'FreshFarm Co.',
            rating: 4.8
          },
          {
            id: '2', 
            name: 'White Onions',
            price: 18,
            supplier: 'AgroMart Ltd.',
            rating: 4.5
          }
        ] : undefined
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('onion')) {
      return "I found 12 suppliers offering onions in your area. The best deals are currently at FreshFarm Co. (₹15/kg) and AgroMart Ltd. (₹18/kg). There's also an active group buying deal that could save you 25% - only 2 more vendors needed!";
    } else if (lowerInput.includes('price') || lowerInput.includes('predict')) {
      return "Based on market analysis, tomato prices are expected to drop 15% next week due to increased supply from Maharashtra. Current best price is ₹22/kg, predicted to go down to ₹18-19/kg.";
    } else if (lowerInput.includes('group') || lowerInput.includes('deal')) {
      return "Great! I found 3 active group deals near you: Onions (25% off, 2 vendors needed), Rice (30% off, 5 vendors needed), and Mixed Spices (20% off, ready to ship). Which interests you most?";
    } else {
      return "I understand you're looking for the best deals. Let me search through our supplier network and current market data to find optimal options for you. What specific products are you interested in?";
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleQuickAction = (action: any) => {
    const actionMessages = {
      "Find Suppliers": "Show me verified suppliers near Hyderabad",
      "Price Analysis": "Analyze current market prices for vegetables",
      "Group Deals": "What group buying deals are available now?",
      "Smart Cart": "Help me optimize my shopping cart"
    };
    
    setInputMessage(actionMessages[action.label as keyof typeof actionMessages] || "");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <AnimatedAssistant />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              AI Shopping Assistant
            </h1>
            <p className="text-muted-foreground">
              Get personalized recommendations and market insights
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-medium transition-all duration-300 hover:scale-105"
                  onClick={() => handleQuickAction(action)}
                >
                  <CardContent className="p-4 text-center">
                    <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{action.label}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Chat Interface */}
          <Card className="shadow-soft">
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-muted text-foreground'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      
                      {/* Product Cards */}
                      {message.productCards && (
                        <div className="mt-3 space-y-2">
                          {message.productCards.map((product) => (
                            <div key={product.id} className="bg-card text-card-foreground p-3 rounded border border-border">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-sm">{product.name}</h4>
                                  <p className="text-xs text-muted-foreground">{product.supplier}</p>
                                  <p className="text-sm font-bold text-primary">₹{product.price}/kg</p>
                                </div>
                                <Badge variant="secondary">★ {product.rating}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-3 space-y-1">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block text-xs bg-background text-foreground px-2 py-1 rounded border border-border hover:bg-muted transition-colors w-full text-left"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted text-foreground px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Input */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask me anything about products, prices, or suppliers..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="bg-gradient-primary"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AiAssistant;