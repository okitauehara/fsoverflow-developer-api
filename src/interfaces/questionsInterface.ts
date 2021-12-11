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

export {
  QuestionBody,
  QuestionDB,
};
