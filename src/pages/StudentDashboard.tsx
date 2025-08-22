import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Layout/Navbar';
import { FileUpload } from '@/components/Student/FileUpload';
import { SubmissionTable } from '@/components/Student/SubmissionTable';
import { ResultsCard } from '@/components/Student/ResultsCard';
import { useAuth } from '@/hooks/useAuth';
import { mockSubmissions } from '@/data/mockData';
import { Submission } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function StudentDashboard() {
  const { user, loading } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showResultsDialog, setShowResultsDialog] = useState(false);

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

  if (user.role !== 'student') {
    return <Navigate to="/teacher" replace />;
  }

  const handleUploadComplete = (submissionId: string) => {
    // In a real app, this would refresh the submissions from the API
    console.log('Upload completed:', submissionId);
  };

  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowResultsDialog(true);
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
            <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Upload assignments and track your learning progress
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <FileUpload onUploadComplete={handleUploadComplete} />
            </div>
            
            <div className="lg:col-span-2">
              <SubmissionTable
                submissions={submissions}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Results Dialog */}
      <Dialog open={showResultsDialog} onOpenChange={setShowResultsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Analysis Results</DialogTitle>
            <DialogDescription>
              {selectedSubmission?.file_name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission?.analysis && (
            <ResultsCard
              analysis={selectedSubmission.analysis}
              teacherApproved={selectedSubmission.teacher_approved}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}