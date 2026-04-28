import express from "express";
import userRoutes from "./routes/userRoute.js";

const app = express();

app.use(express.json());

app.use("/api", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;