import fs from "fs";
import { logger } from "./logger.js";

export function stringifyObjeto (objeto){
    
    const _stringObjeto = JSON.stringify(objeto);
    return _stringObjeto;
}


export function limpaArquivo (path){
    try {
        fs.writeFileSync(path, "");
        logger.info("O arquivo foi limpo com sucesso.")
    } catch (err) {
        logger.error(`O arquivo não foi encontrado,\n ${err}.`);
    }
}

export function FormatadorDeData(date){
    const dateDay = date.slice(0, 2);
    const dateMonth = date.slice(3, 5);
    const dateYear = date.slice(6, 10);
    
    return `${dateYear}-${dateMonth}-${dateDay}`
}