import express from "express";
import { QuizRepository } from "../repositories/quiz.js";

export const QuizRouter = express.Router();

QuizRouter.post("/create", async (req, res) => {
  try {
    const { quiz, answers } = req.body;

    if (!quiz || !answers) {
      return res.status(400).json({
        error: "Dados do quiz e respostas são obrigatórios",
      });
    }

    await QuizRepository.create({ quiz, answers });
    res.status(201).json({ message: "Quiz registrado com sucesso" });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

QuizRouter.get("/", async (req, res) => {
  try {
    const quizzes = await QuizRepository.findAll();
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

QuizRouter.get("/:id", async (req, res) => {
  try {
    const quizz = await QuizRepository.findById(req.params.id);
    if (quizz) {
      res.status(200).json({ quizz });
    } else {
      res.status(404).json({ error: "Quiz não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
