import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./src/routes/users.js";
import authRouter from "./src/routes/auth.js";
import itemsRouter from "./src/routes/items.js";
import stationsRouter from "./src/routes/stations.js";
import locationsRouter from "./src/routes/locations.js";
import stationItemsRouter from "./src/routes/stationsItems.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/items", itemsRouter);
app.use("/stations", stationsRouter);
app.use("/locations", locationsRouter);
app.use("/stationItems", stationItemsRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
