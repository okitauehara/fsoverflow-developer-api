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
  question: string;
  student: string;
  class: string;
  tags: string;
  answered: boolean;
  submitedAt: string;
  answeredAt?: string;
  answeredBy?: number;
  answer?: string;
}

interface UnansweredQuestion {
  id: number;
  question: string;
  student: string;
  class: string;
  submitedAt: string;
}

export {
  QuestionBody,
  QuestionDB,
  Answer,
  Question,
  UnansweredQuestion,
};
