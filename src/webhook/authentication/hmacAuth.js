import crypto from "crypto";
import "dotenv/config";
import { logger } from "../../utils/logger.js";

export async function validaHmac (payload, signature, rawData){
    const token = process.env.WEBHOOK_TOKEN;
    
    const payloadEncrypted = Buffer.from(payload)
                                .toString("base64");

    const localHmac = crypto.createHmac("sha1", token)
                            .update(payloadEncrypted)
                            .digest("base64");
    
    const hmacEsperado = `sha1=${localHmac}`;

    logger.info(`assinatura: ${signature}\nhmacEsperado: ${hmacEsperado}\npayload: ${payload}`);

    try{
        if(crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hmacEsperado))){
            const data = {
                type: rawData.type,
                id: rawData.id,
                action: rawData.action
            }
            return data;
        } 
        else 
        {
            return logger.error(`erro relacionado ao tamanho do buffer`);
        }
    } catch(err) {
        logger.error(`Erro na comparação segura de hashes: \n${err}`);
        return null;
    }
}
            