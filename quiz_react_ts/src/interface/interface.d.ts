interface Answer_Object {
    question: string;
    answer:string;
    correct: boolean;
    correctAnswer: string;
}

interface QuestionCard_Props_Interface {
    question: string;
    answer: string[];
    callback: (e:React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: Answer_Object | any;
    questionNr: number;
    totalQuestions: number;
}

interface Question_Interface {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    length: number;
    question: string;
    type: string;
}

interface Question_Add_Answer {
    answers: string[];
}

interface Question_State extends Question_Interface, Question_Add_Answer{}

interface Answer_Object {
    question: string;
    answer:string;
    correct: boolean;
    correctAnswer: string;
}