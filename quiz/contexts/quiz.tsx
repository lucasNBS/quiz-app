import { Question } from "@/@types/quiz";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type QuizContextProps = {
  quiz: Question[];
  setQuiz: Dispatch<SetStateAction<Question[]>>;
  data: string[];
  setData: Dispatch<SetStateAction<string[]>>;
  alreadyCreated: boolean;
  setAlreadyCreated: Dispatch<SetStateAction<boolean>>;
};

export const QuizContext = createContext({} as QuizContextProps);

type QuizProviderProps = {
  children: ReactNode;
};

export function QuizProvider({ children }: QuizProviderProps) {
  const [quiz, setQuiz] = useState([] as Question[]);
  const [data, setData] = useState([] as string[]);
  const [alreadyCreated, setAlreadyCreated] = useState(false);

  return (
    <QuizContext.Provider
      value={{
        quiz,
        setQuiz,
        data,
        setData,
        alreadyCreated,
        setAlreadyCreated,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
