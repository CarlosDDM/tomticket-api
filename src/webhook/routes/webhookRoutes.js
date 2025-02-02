import express from "express";
import { escutaWebhook } from "../controllers/webhookController.js";

const router = express.Router();

router.post('/webhook', escutaWebhook);

export default router;
