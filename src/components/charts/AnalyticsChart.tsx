import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsChart = () => {
  const salesData = [
    { name: 'Jan', sales: 4000, savings: 2400 },
    { name: 'Feb', sales: 3000, savings: 1398 },
    { name: 'Mar', sales: 5000, savings: 3800 },
    { name: 'Apr', sales: 7800, savings: 3908 },
    { name: 'May', sales: 8900, savings: 4800 },
    { name: 'Jun', sales: 6900, savings: 3800 },
  ];

  const productData = [
    { name: 'Tomatoes', orders: 156 },
    { name: 'Onions', orders: 142 },
    { name: 'Rice', orders: 89 },
    { name: 'Potatoes', orders: 78 },
    { name: 'Spices', orders: 65 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Sales & Savings Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="Sales (₹)"
              />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={3}
                name="Savings (₹)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="orders" 
                fill="hsl(var(--accent))"
                name="Orders"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsChart;