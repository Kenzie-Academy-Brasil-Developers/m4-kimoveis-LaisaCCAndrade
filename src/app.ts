import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleErros } from "./error";
import userRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";
import categoriesRoutes from "./routes/categories.routes";
import estatesRoutes from "./routes/estates.routes";
import schedulesRoutes from "./routes/schedules.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.use("/login", loginRoutes);

app.use("/categories", categoriesRoutes);

app.use("/realEstate", estatesRoutes);

app.use("/schedules", schedulesRoutes);

app.use(handleErros);

export default app;
