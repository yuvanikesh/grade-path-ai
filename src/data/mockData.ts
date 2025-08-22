import { Submission, ClassAnalytics, Analysis } from '@/types';

export const mockSubmissions: Submission[] = [
  {
    id: '1',
    student_id: 'student1',
    student_name: 'Alice Johnson',
    file_name: 'math_assignment_1.pdf',
    file_url: '#',
    status: 'completed',
    created_at: '2024-01-15T10:30:00Z',
    ai_score: 85,
    teacher_approved: true,
    analysis: {
      total_score: 85,
      criteria: [
        { name: 'Problem Solving', score: 90, reason: 'Excellent approach to complex problems' },
        { name: 'Mathematical Accuracy', score: 80, reason: 'Minor calculation errors' },
        { name: 'Presentation', score: 85, reason: 'Well-organized work' },
      ],
      topic_scores: [
        { topic: 'Algebra', score: 90 },
        { topic: 'Geometry', score: 75 },
        { topic: 'Calculus', score: 88 },
      ],
      overall_feedback: 'Strong performance with excellent problem-solving skills. Focus on accuracy in calculations.',
      resources: [
        { title: 'Khan Academy - Algebra Basics', url: 'https://khanacademy.org/algebra' },
        { title: 'MIT OCW - Calculus', url: 'https://ocw.mit.edu/calculus' },
      ],
    },
  },
  {
    id: '2',
    student_id: 'student1',
    student_name: 'Alice Johnson',
    file_name: 'physics_test.pdf',
    file_url: '#',
    status: 'pending',
    created_at: '2024-01-20T14:15:00Z',
    ai_score: 78,
    teacher_approved: false,
    analysis: {
      total_score: 78,
      criteria: [
        { name: 'Conceptual Understanding', score: 85, reason: 'Good grasp of fundamental concepts' },
        { name: 'Problem Application', score: 70, reason: 'Some difficulty applying concepts to new problems' },
        { name: 'Units and Notation', score: 80, reason: 'Mostly correct use of units' },
      ],
      topic_scores: [
        { topic: 'Mechanics', score: 82 },
        { topic: 'Thermodynamics', score: 65 },
        { topic: 'Waves', score: 85 },
      ],
      overall_feedback: 'Good understanding of concepts but needs practice with problem application.',
      resources: [
        { title: 'Physics Classroom - Mechanics', url: 'https://physicsclassroom.com' },
        { title: 'Khan Academy - Thermodynamics', url: 'https://khanacademy.org/physics' },
      ],
    },
  },
  {
    id: '3',
    student_id: 'student2',
    student_name: 'Bob Smith',
    file_name: 'chemistry_lab.pdf',
    file_url: '#',
    status: 'processing',
    created_at: '2024-01-22T09:45:00Z',
  },
];

export const mockTeacherSubmissions: Submission[] = [
  {
    id: '1',
    student_id: 'student1',
    student_name: 'Alice Johnson',
    file_name: 'math_assignment_1.pdf',
    file_url: '#',
    status: 'completed',
    created_at: '2024-01-15T10:30:00Z',
    ai_score: 85,
    teacher_approved: true,
    analysis: {
      total_score: 85,
      criteria: [
        { name: 'Problem Solving', score: 90, reason: 'Excellent approach to complex problems' },
        { name: 'Mathematical Accuracy', score: 80, reason: 'Minor calculation errors' },
        { name: 'Presentation', score: 85, reason: 'Well-organized work' },
      ],
      topic_scores: [
        { topic: 'Algebra', score: 90 },
        { topic: 'Geometry', score: 75 },
        { topic: 'Calculus', score: 88 },
      ],
      overall_feedback: 'Strong performance with excellent problem-solving skills. Focus on accuracy in calculations.',
      resources: [
        { title: 'Khan Academy - Algebra Basics', url: 'https://khanacademy.org/algebra' },
        { title: 'MIT OCW - Calculus', url: 'https://ocw.mit.edu/calculus' },
      ],
    },
  },
  {
    id: '2',
    student_id: 'student1',
    student_name: 'Alice Johnson',
    file_name: 'physics_test.pdf',
    file_url: '#',
    status: 'pending',
    created_at: '2024-01-20T14:15:00Z',
    ai_score: 78,
    teacher_approved: false,
    analysis: {
      total_score: 78,
      criteria: [
        { name: 'Conceptual Understanding', score: 85, reason: 'Good grasp of fundamental concepts' },
        { name: 'Problem Application', score: 70, reason: 'Some difficulty applying concepts to new problems' },
        { name: 'Units and Notation', score: 80, reason: 'Mostly correct use of units' },
      ],
      topic_scores: [
        { topic: 'Mechanics', score: 82 },
        { topic: 'Thermodynamics', score: 65 },
        { topic: 'Waves', score: 85 },
      ],
      overall_feedback: 'Good understanding of concepts but needs practice with problem application.',
      resources: [
        { title: 'Physics Classroom - Mechanics', url: 'https://physicsclassroom.com' },
        { title: 'Khan Academy - Thermodynamics', url: 'https://khanacademy.org/physics' },
      ],
    },
  },
  {
    id: '3',
    student_id: 'student2',
    student_name: 'Bob Smith',
    file_name: 'chemistry_lab.pdf',
    file_url: '#',
    status: 'completed',
    created_at: '2024-01-22T09:45:00Z',
    ai_score: 92,
    teacher_approved: true,
    analysis: {
      total_score: 92,
      criteria: [
        { name: 'Experimental Design', score: 95, reason: 'Excellent methodology' },
        { name: 'Data Analysis', score: 90, reason: 'Thorough analysis' },
        { name: 'Lab Safety', score: 90, reason: 'Good safety practices' },
      ],
      topic_scores: [
        { topic: 'Organic Chemistry', score: 95 },
        { topic: 'Lab Techniques', score: 88 },
        { topic: 'Data Analysis', score: 90 },
      ],
      overall_feedback: 'Outstanding lab work with excellent experimental design.',
      resources: [],
    },
  },
  {
    id: '4',
    student_id: 'student3',
    student_name: 'Carol Davis',
    file_name: 'biology_quiz.pdf',
    file_url: '#',
    status: 'completed',
    created_at: '2024-01-18T11:20:00Z',
    ai_score: 67,
    teacher_approved: false,
    analysis: {
      total_score: 67,
      criteria: [
        { name: 'Content Knowledge', score: 70, reason: 'Basic understanding present' },
        { name: 'Critical Thinking', score: 60, reason: 'Needs improvement in analysis' },
        { name: 'Scientific Method', score: 72, reason: 'Good grasp of methodology' },
      ],
      topic_scores: [
        { topic: 'Cell Biology', score: 55 },
        { topic: 'Genetics', score: 75 },
        { topic: 'Evolution', score: 70 },
      ],
      overall_feedback: 'Shows promise but needs to strengthen understanding of cell biology concepts.',
      resources: [
        { title: 'Khan Academy - Cell Biology', url: 'https://khanacademy.org/biology' },
        { title: 'Crash Course Biology', url: 'https://youtube.com/crashcourse' },
      ],
    },
  },
];

export const mockClassAnalytics: ClassAnalytics = {
  average_score: 80.5,
  weak_topics_percentage: 25,
  total_submissions: 42,
  topic_distribution: [
    { topic: 'Algebra', average_score: 85, student_count: 15 },
    { topic: 'Geometry', average_score: 72, student_count: 12 },
    { topic: 'Calculus', average_score: 88, student_count: 8 },
    { topic: 'Physics', average_score: 75, student_count: 10 },
    { topic: 'Chemistry', average_score: 82, student_count: 9 },
    { topic: 'Biology', average_score: 68, student_count: 11 },
    { topic: 'Statistics', average_score: 79, student_count: 7 },
  ],
};

// Mock API functions
export const mockUploadFile = async (file: File): Promise<{ success: boolean; submissionId?: string; error?: string }> => {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  if (Math.random() > 0.1) { // 90% success rate
    return { success: true, submissionId: `sub_${Date.now()}` };
  } else {
    return { success: false, error: 'Upload failed. Please try again.' };
  }
};

export const mockApproveSubmission = async (submissionId: string, approved: boolean): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

export const mockAdjustScore = async (submissionId: string, newScore: number): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};