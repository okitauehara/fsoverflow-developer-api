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

export {
  QuestionBody,
  QuestionDB,
  AnswerBody,
  UnansweredQuestionsDB,
  QuestionStatusDB,
};
