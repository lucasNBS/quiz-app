import { Quiz } from "../models/quiz.js";

async function findAll() {
  return await Quiz.findAll();
}

async function findById(id) {
  return await Quiz.findByPk(id);
}

async function create({ quiz, answers }) {
  await Quiz.create({
    quiz: JSON.stringify(quiz),
    answers: JSON.stringify(answers),
  });
}

export const QuizRepository = {
  findAll,
  findById,
  create,
};
