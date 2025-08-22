export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher';
  created_at: string;
}

export interface Submission {
  id: string;
  student_id: string;
  student_name: string;
  file_name: string;
  file_url: string;
  status: 'pending' | 'processing' | 'completed' | 'approved' | 'rejected';
  created_at: string;
  ai_score?: number;
  teacher_approved?: boolean;
  analysis?: Analysis;
}

export interface Analysis {
  total_score: number;
  criteria: Array<{
    name: string;
    score: number;
    reason: string;
  }>;
  topic_scores: Array<{
    topic: string;
    score: number;
  }>;
  overall_feedback: string;
  resources: Array<{
    title: string;
    url: string;
  }>;
}

export interface ClassAnalytics {
  average_score: number;
  weak_topics_percentage: number;
  total_submissions: number;
  topic_distribution: Array<{
    topic: string;
    average_score: number;
    student_count: number;
  }>;
}