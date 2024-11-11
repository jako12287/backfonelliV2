import express, { Response, Request } from "express";
import dotenv from "dotenv";
import connectDB from "./DB/database";
import orderRoutes from "./routes/orders.route";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();


app.use(express.json());
app.use("/api", orderRoutes);

app.get("/", (_, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.get("*", (_, res: Response) => {
  res.send("SERVER 404!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
