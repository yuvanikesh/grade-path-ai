import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Submission } from '@/types';

interface SubmissionTableProps {
  submissions: Submission[];
  onViewDetails: (submission: Submission) => void;
}

export function SubmissionTable({ submissions, onViewDetails }: SubmissionTableProps) {
  const getStatusIcon = (status: Submission['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <AlertTriangle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: Submission['status']) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'processing':
        return 'secondary';
      case 'completed':
        return 'outline';
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: Submission['status'], teacherApproved?: boolean) => {
    if (status === 'completed' && teacherApproved === false) {
      return 'Awaiting Approval';
    }
    if (status === 'completed' && teacherApproved === true) {
      return 'Approved';
    }
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Completed';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Submissions</CardTitle>
        <CardDescription>
          Track your uploaded assignments and their analysis results
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submissions.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-muted-foreground">No submissions yet</p>
            <p className="text-sm text-muted-foreground">Upload your first assignment to get started</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>AI Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission, index) => (
                  <motion.tr
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{submission.file_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(submission.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusVariant(submission.status)}
                        className="flex items-center space-x-1 w-fit"
                      >
                        {getStatusIcon(submission.status)}
                        <span>{getStatusText(submission.status, submission.teacher_approved)}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {submission.ai_score !== undefined ? (
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${
                            submission.ai_score >= 80 ? 'text-green-600' :
                            submission.ai_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {submission.ai_score}%
                          </span>
                          {submission.teacher_approved === false && (
                            <Badge variant="outline" className="text-xs">
                              Pending Approval
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {submission.analysis && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onViewDetails(submission)}
                        >
                          View Details
                        </Button>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}