import { motion } from "framer-motion";
import { Users, Clock, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface GroupDeal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  participants: number;
  timeLeft: string;
  savings: number;
  product: string;
  pricePerUnit: number;
}

interface GroupBuyingCardProps {
  deal: GroupDeal;
}

const GroupBuyingCard = ({ deal }: GroupBuyingCardProps) => {
  const progress = (deal.currentAmount / deal.targetAmount) * 100;
  const remaining = deal.targetAmount - deal.currentAmount;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="shadow-soft hover:shadow-medium transition-all duration-300 border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{deal.title}</CardTitle>
            <Badge className="bg-gradient-secondary text-secondary-foreground">
              <TrendingDown className="h-3 w-3 mr-1" />
              {deal.savings}% OFF
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{deal.product}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">₹{deal.currentAmount} / ₹{deal.targetAmount}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              ₹{remaining} more needed to unlock this deal
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4 text-accent" />
                <span className="text-lg font-bold text-accent">{deal.participants}</span>
              </div>
              <p className="text-xs text-muted-foreground">Participants</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-lg font-bold text-warning">{deal.timeLeft}</span>
              </div>
              <p className="text-xs text-muted-foreground">Time Left</p>
            </div>
          </div>
          
          <div className="pt-2 border-t border-border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm">Price per unit:</span>
              <span className="text-lg font-bold text-primary">₹{deal.pricePerUnit}</span>
            </div>
            
            <Button className="w-full bg-gradient-primary">
              Join Group Deal
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GroupBuyingCard;