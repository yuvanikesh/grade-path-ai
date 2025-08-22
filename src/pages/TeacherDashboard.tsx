import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Layout/Navbar';
import { AnalyticsCards } from '@/components/Teacher/AnalyticsCards';
import { TopicHeatmap } from '@/components/Teacher/TopicHeatmap';
import { SubmissionApprovalTable } from '@/components/Teacher/SubmissionApprovalTable';
import { useAuth } from '@/hooks/useAuth';
import { mockClassAnalytics, mockTeacherSubmissions } from '@/data/mockData';
import { Submission } from '@/types';

export default function TeacherDashboard() {
  const { user, loading } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>(mockTeacherSubmissions);
  const analytics = mockClassAnalytics;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== 'teacher') {
    return <Navigate to="/student" replace />;
  }

  const handleSubmissionUpdate = (submissionId: string, updates: Partial<Submission>) => {
    setSubmissions(prev => 
      prev.map(submission => 
        submission.id === submissionId 
          ? { ...submission, ...updates }
          : submission
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitor class performance and review AI assessments
            </p>
          </div>

          {/* Analytics Overview */}
          <AnalyticsCards analytics={analytics} />

          {/* Topic Performance Heatmap */}
          <TopicHeatmap analytics={analytics} />

          {/* Submissions Table */}
          <SubmissionApprovalTable
            submissions={submissions}
            onSubmissionUpdate={handleSubmissionUpdate}
          />
        </motion.div>
      </main>
    </div>
  );
}