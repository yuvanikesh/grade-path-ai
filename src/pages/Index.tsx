import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, BarChart3, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'teacher' ? '/teacher' : '/student');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced OCR and machine learning algorithms analyze student work automatically.',
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Get insights into class performance and identify areas for improvement.',
    },
    {
      icon: Users,
      title: 'Student & Teacher Portals',
      description: 'Dedicated interfaces for students and teachers with role-based features.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold text-foreground">EduBridge AI</h1>
            </div>
            <Button onClick={() => navigate('/auth')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">
              Intelligent Assessment &<br />
              <span className="text-primary">Learning Platform</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Harness the power of AI to analyze student work, provide instant feedback, 
              and help educators make data-driven decisions for better learning outcomes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-3"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to streamline assessment and improve learning outcomes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="h-full">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Transform Your Classroom?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of educators who are already using EduBridge AI to 
                enhance their teaching and improve student outcomes.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="text-lg px-8 py-3"
              >
                Get Started Today
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
