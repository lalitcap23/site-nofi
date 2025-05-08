import express from "express";
import { authMiddleware } from "./middleware";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/api/v1/website", authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).userId; // adjust typing if needed
    const { url } = req.body;

    const data = await prismaClient.website.create({
      data: {
        UsedId: userId,
        url,
      },
    });

    res.json({ id: data.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to create website entry" });
  }
});

app.post("/api/v1/website/status", authMiddleware, (req, res) => {
  res.json({ message: "Website status endpoint" });
});

app.post("/api/v1/websites", authMiddleware, (req, res) => {
  res.json({ message: "List of websites endpoint" });
});

app.post("/api/v1/website/:id", authMiddleware, (req, res) => {
  res.json({ message: `Specific website with ID ${req.params.id}` });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
