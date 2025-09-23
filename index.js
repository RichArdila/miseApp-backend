import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./src/routes/users.js";
import authRouter from "./src/routes/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
