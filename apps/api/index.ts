import express from "express";
import { authMiddleware } from "./middleware";
import { PrismaClient } from "@prisma/client";
import  cors  from  "cors";

const prismaClient = new PrismaClient();
const app = express();

app.use(cors());
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

app.get("/api/v1/website/status", authMiddleware, async (req, res) => {
    const websiteId = req.query.websiteId! as unknown as string;
    const userId = req.userId;

    const data = await prismaClient.website.findFirst({
        where: {
            id: websiteId,
            userId,
            disabled: false
        },
        include: {
            ticks: true
        }
    })

    res.json(data)
 
})

app.get("/api/v1/websites", authMiddleware, async (req, res) => {
    const userId = req.userId!;

    const websites = await prismaClient.website.findMany({
        where: {
            userId,
            disabled: false
        },
        include: {
            ticks: true
        }
    })

    res.json({
        websites
    })
})

app.delete("/api/v1/website/", authMiddleware, async (req, res) => {
    const websiteId = req.body.websiteId;
    const userId = req.userId!;

    await prismaClient.website.update({
        where: {
            id: websiteId,
            userId
        },
        data: {
            disabled: true
        }
    })

    res.json({
        message: "Deleted website successfully"
    })
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
