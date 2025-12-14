export interface IAssignment {
  id: string;
  examId: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  categories: {
    id: string;
    title: string;
    questions: unknown[];
  }[];
  submissions: {
    id: string;
    status: 'PENDING' | 'SUBMITTED' | 'APPROVED';
  }[];
  _count: {
    submissions: number;
    categories: number;
  };
}
