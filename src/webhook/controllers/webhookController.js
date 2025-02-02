import { CoreIndividual } from "../../services/core/tomticketCore.js";
import { validaHmac } from "../authentication/hmacAuth.js";

export const escutaWebhook = async (req, res) => {
    const payload = JSON.stringify(req.body);
    const signature = await req.headers["x-hub-signature"];

    if (!signature) {
        return res.status(400).send("Assinatura ausente.");
    }
    
    const data = await validaHmac(payload, signature, req.body);
   
    if (!data){
        return res.status(400).send("Algo deu errado.")
    }
    else {
        if (data.type === "ticket"){
            await CoreIndividual(data);
        }
        return res.status(200).send("Success.");
    }
}