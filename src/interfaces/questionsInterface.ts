interface QuestionBody {
  question: string;
  student: string;
  classname: string;
  tags: string;
}

interface QuestionDB {
  question: string;
  studentId: number;
  tags: string;
}

interface Answer {
  userId: number;
  questionId: number;
  answer: string;
}

interface Question {
  id: number;
  question: string;
  student: number;
  tags: string;
  answered: boolean;
  submitedAt: string;
  answeredAt?: string;
  answeredBy?: number;
  answer?: string;
}

export {
  QuestionBody,
  QuestionDB,
  Answer,
  Question,
};
