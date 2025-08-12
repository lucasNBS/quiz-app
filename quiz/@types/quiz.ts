export type DifficultyType = "easy" | "medium" | "hard";

export type Question = {
  type: string;
  difficulty: DifficultyType;
  category: string;
  question: string;
  correct_answer: string;
  answers: string[];
};

export type ApiQuestion = {
  difficulty: DifficultyType;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
