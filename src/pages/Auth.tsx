import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { LoginForm } from '@/components/Auth/LoginForm';
import { SignUpForm } from '@/components/Auth/SignUpForm';
import { useAuth } from '@/hooks/useAuth';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      // Redirect based on role
      if (user.role === 'teacher') {
        window.location.href = '/teacher';
      } else {
        window.location.href = '/student';
      }
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={user.role === 'teacher' ? '/teacher' : '/student'} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <BookOpen className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">EduBridge AI</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Intelligent Assessment & Learning Platform
        </p>
      </motion.div>

      {isLogin ? (
        <LoginForm onToggleForm={() => setIsLogin(false)} />
      ) : (
        <SignUpForm onToggleForm={() => setIsLogin(true)} />
      )}
    </div>
  );
}