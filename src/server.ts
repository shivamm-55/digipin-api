import express from "express";
import cors from "cors";
import digipinRoutes from "./routes/digipin.route";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/digipin", digipinRoutes);

app.get("/health", (_, res) => {
  res.send("DIGIPIN API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
