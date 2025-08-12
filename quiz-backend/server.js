import express from "express";
import cors from "cors";
import { sequelize } from "./src/services/db.js";
import { QuizRouter } from "./src/routes/quiz.js";

const app = express();

app.use(cors());
app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Unable to synchronize the database:", err);
  });

app.use("/api/quiz", QuizRouter);

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
