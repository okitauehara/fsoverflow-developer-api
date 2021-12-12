interface QuestionBody {
  question: string;
  student: string;
  classname: string;
  tags: string;
}

interface AnswerBody {
  userId: number;
  questionId: number;
  answer: string;
}

interface QuestionDB {
  question: string;
  studentId: number;
  tags: string;
}

interface UnansweredQuestionsDB {
  id: number;
  question: string;
  student: string;
  class: string;
  submitedAt: string;
}

interface QuestionStatusDB {
  answered: boolean;
}

interface UnansweredDB {
  question: string;
  student: string;
  class: string;
  tags: string;
  answered: boolean;
  submitedAt: string;
}

interface AnsweredDB extends UnansweredDB {
  answeredAt: string;
  answeredBy: string;
  answer: string;
}

export {
  QuestionBody,
  QuestionDB,
  AnswerBody,
  UnansweredQuestionsDB,
  QuestionStatusDB,
  UnansweredDB,
  AnsweredDB,
};
