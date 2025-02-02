import "dotenv/config";
import router from "./webhook/routes/webhookRoutes.js";
import { Core } from "./services/core/tomticketCore.js";
import express from "express";
import fs from "fs";
import https from "https"
import cors from "cors"
import { logger } from "./utils/logger.js";
import scheduler from "./utils/cron.js";

const app = express();
const PORT = process.env.PORT;

const options = {
    cert: fs.readFileSync(process.env.CERT_PATH),
    key: fs.readFileSync(process.env.KEY_CERT_PATH)
}

app.use(cors());
app.use(express.json());

app.use('/api', router);

https.createServer(options, app)
.listen(PORT, async () => {
    await Core();
    scheduler();
    logger.info(`Rodando na porta ${PORT}.`);
})



