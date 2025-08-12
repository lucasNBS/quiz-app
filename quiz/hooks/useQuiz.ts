import { QuizContext } from "@/contexts/quiz";
import { useContext } from "react";

export function useQuiz() {
  const { quiz, setQuiz, data, setData, alreadyCreated, setAlreadyCreated } =
    useContext(QuizContext);
  return { quiz, setQuiz, data, setData, alreadyCreated, setAlreadyCreated };
}
