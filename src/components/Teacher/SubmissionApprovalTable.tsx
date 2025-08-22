import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, Check, X, Edit, ExternalLink } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Submission, Analysis } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { mockApproveSubmission, mockAdjustScore } from '@/data/mockData';

interface SubmissionApprovalTableProps {
  submissions: Submission[];
  onSubmissionUpdate: (submissionId: string, updates: Partial<Submission>) => void;
}

export function SubmissionApprovalTable({ submissions, onSubmissionUpdate }: SubmissionApprovalTableProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [newScore, setNewScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleApprove = async (submission: Submission, approved: boolean) => {
    setIsLoading(true);
    
    try {
      const result = await mockApproveSubmission(submission.id, approved);
      
      if (result.success) {
        onSubmissionUpdate(submission.id, { teacher_approved: approved });
        toast({
          title: approved ? 'Approved' : 'Rejected',
          description: `Submission has been ${approved ? 'approved' : 'rejected'}.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update submission status.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdjustScore = async () => {
    if (!selectedSubmission || newScore < 0 || newScore > 100) return;
    
    setIsLoading(true);
    
    try {
      const result = await mockAdjustScore(selectedSubmission.id, newScore);
      
      if (result.success) {
        onSubmissionUpdate(selectedSubmission.id, {
          ai_score: newScore,
          teacher_approved: true,
          analysis: selectedSubmission.analysis ? {
            ...selectedSubmission.analysis,
            total_score: newScore,
          } : undefined,
        });
        
        toast({
          title: 'Score Updated',
          description: `Score has been adjusted to ${newScore}%.`,
        });
        
        setShowScoreDialog(false);
        setShowDetailDialog(false);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to adjust score.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openDetailDialog = (submission: Submission) => {
    setSelectedSubmission(submission);
    setNewScore(submission.ai_score || 0);
    setShowDetailDialog(true);
  };

  const getStatusVariant = (status: Submission['status'], teacherApproved?: boolean) => {
    if (status === 'completed' && teacherApproved === false) return 'secondary';
    if (status === 'completed' && teacherApproved === true) return 'default';
    return 'outline';
  };

  const getStatusText = (status: Submission['status'], teacherApproved?: boolean) => {
    if (status === 'completed' && teacherApproved === false) return 'Pending Review';
    if (status === 'completed' && teacherApproved === true) return 'Approved';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Student Submissions</CardTitle>
          <CardDescription>
            Review and approve AI-generated scores and resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No submissions yet</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>Date</TableHead>
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
                    >
                      <TableCell className="font-medium">
                        {submission.student_name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{submission.file_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(submission.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(submission.status, submission.teacher_approved)}>
                          {getStatusText(submission.status, submission.teacher_approved)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {submission.ai_score !== undefined ? (
                          <span className={`font-medium ${
                            submission.ai_score >= 80 ? 'text-green-600' :
                            submission.ai_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {submission.ai_score}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {submission.analysis && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openDetailDialog(submission)}
                              disabled={isLoading}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          
                          {submission.status === 'completed' && submission.teacher_approved === false && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleApprove(submission, true)}
                                disabled={isLoading}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleApprove(submission, false)}
                                disabled={isLoading}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              {selectedSubmission?.student_name} - {selectedSubmission?.file_name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission?.analysis && (
            <div className="space-y-6">
              {/* File Link */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => window.open(selectedSubmission.file_url, '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View File
                </Button>
              </div>

              {/* AI Analysis */}
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Overall Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-center">
                        <span className={
                          selectedSubmission.analysis.total_score >= 80 ? 'text-green-600' :
                          selectedSubmission.analysis.total_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }>
                          {selectedSubmission.analysis.total_score}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Criteria Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedSubmission.analysis.criteria.map((criterion) => (
                        <div key={criterion.name} className="flex justify-between">
                          <span className="text-sm">{criterion.name}</span>
                          <span className="text-sm font-medium">{criterion.score}%</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Topic Scores</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 md:grid-cols-3">
                      {selectedSubmission.analysis.topic_scores.map((topic) => (
                        <div key={topic.topic} className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">{topic.topic}</span>
                          <Badge variant={topic.score >= 70 ? 'default' : 'destructive'}>
                            {topic.score}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {selectedSubmission.analysis.overall_feedback}
                    </p>
                  </CardContent>
                </Card>

                {selectedSubmission.analysis.resources.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommended Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedSubmission.analysis.resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{resource.title}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(resource.url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>

              <DialogFooter className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowScoreDialog(true)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Adjust Score
                </Button>
                
                {selectedSubmission.teacher_approved === false && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => handleApprove(selectedSubmission, false)}
                      disabled={isLoading}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(selectedSubmission, true)}
                      disabled={isLoading}
                    >
                      Approve
                    </Button>
                  </>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Score Adjustment Dialog */}
      <Dialog open={showScoreDialog} onOpenChange={setShowScoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Score</DialogTitle>
            <DialogDescription>
              Enter the new score for this submission (0-100)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="score">New Score (%)</Label>
              <Input
                id="score"
                type="number"
                min="0"
                max="100"
                value={newScore}
                onChange={(e) => setNewScore(Number(e.target.value))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScoreDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdjustScore} disabled={isLoading || newScore < 0 || newScore > 100}>
              {isLoading ? 'Updating...' : 'Update Score'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}