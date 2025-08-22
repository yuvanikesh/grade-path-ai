import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClassAnalytics } from '@/types';

interface AnalyticsCardsProps {
  analytics: ClassAnalytics;
}

export function AnalyticsCards({ analytics }: AnalyticsCardsProps) {
  const cards = [
    {
      title: 'Average Score',
      value: `${analytics.average_score}%`,
      description: 'Class average performance',
      icon: TrendingUp,
      color: analytics.average_score >= 80 ? 'text-green-600' : 
             analytics.average_score >= 60 ? 'text-yellow-600' : 'text-red-600',
      bgColor: analytics.average_score >= 80 ? 'bg-green-50' : 
               analytics.average_score >= 60 ? 'bg-yellow-50' : 'bg-red-50',
    },
    {
      title: 'Weak Topics',
      value: `${analytics.weak_topics_percentage}%`,
      description: 'Students struggling',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Total Submissions',
      value: analytics.total_submissions.toString(),
      description: 'Assignments submitted',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Topics Analyzed',
      value: analytics.topic_distribution.length.toString(),
      description: 'Different subjects covered',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={card.bgColor}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}