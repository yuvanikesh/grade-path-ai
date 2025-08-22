import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BookOpen, ExternalLink, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Analysis } from '@/types';

interface ResultsCardProps {
  analysis: Analysis;
  teacherApproved?: boolean;
}

export function ResultsCard({ analysis, teacherApproved }: ResultsCardProps) {
  const weakTopics = analysis.topic_scores.filter(topic => topic.score < 70);
  const strongTopics = analysis.topic_scores.filter(topic => topic.score >= 80);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Approval Status Alert */}
      {teacherApproved === false && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your score is awaiting teacher approval. The final score may be adjusted.
          </AlertDescription>
        </Alert>
      )}

      {/* Overall Score */}
      <Card className={`${getScoreBg(analysis.total_score)}`}>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            <span className={getScoreColor(analysis.total_score)}>
              {analysis.total_score}%
            </span>
          </CardTitle>
          <CardDescription>Overall AI Score</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Criteria Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Assessment Criteria</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.criteria.map((criterion, index) => (
              <motion.div
                key={criterion.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{criterion.name}</span>
                  <span className={`font-bold ${getScoreColor(criterion.score)}`}>
                    {criterion.score}%
                  </span>
                </div>
                <Progress value={criterion.score} className="h-2" />
                <p className="text-sm text-muted-foreground">{criterion.reason}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Topic Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Topic Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.topic_scores.map((topic, index) => (
              <motion.div
                key={topic.topic}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center"
              >
                <span className="font-medium">{topic.topic}</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold ${getScoreColor(topic.score)}`}>
                    {topic.score}%
                  </span>
                  {topic.score >= 80 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : topic.score < 70 ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : null}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Weak Topics Alert */}
      {weakTopics.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center space-x-2">
              <TrendingDown className="h-5 w-5" />
              <span>Areas for Improvement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {weakTopics.map((topic) => (
                <Badge
                  key={topic.topic}
                  variant="outline"
                  className="border-yellow-400 text-yellow-800"
                >
                  {topic.topic} ({topic.score}%)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Strong Topics */}
      {strongTopics.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Strengths</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {strongTopics.map((topic) => (
                <Badge
                  key={topic.topic}
                  variant="outline"
                  className="border-green-400 text-green-800"
                >
                  {topic.topic} ({topic.score}%)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overall Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {analysis.overall_feedback}
          </p>
        </CardContent>
      </Card>

      {/* Recommended Resources */}
      {analysis.resources.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Resources</CardTitle>
            <CardDescription>
              Resources to help you improve in your weak areas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => window.open(resource.url, '_blank')}
                >
                  <span>{resource.title}</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}