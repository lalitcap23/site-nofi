import express from "express";
import { authMiddleware } from "./middleware";

const app = express();

app.post("/api/v1/website",authMiddleware, (_req, _res) => {
    const userId = _req.userId;
 
});

app.post("/api/v1/website/status",authMiddleware, (req, res) => {
 
});

app.post("/api/v1/websites",authMiddleware, (req, res) => {
 
});

app.post("/api/v1/website/:id",authMiddleware, (req, res) => {
 
});


app.listen(3000);
