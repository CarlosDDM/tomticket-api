import { CronJob } from "cron";
import { limpaArquivo } from "./serviceUtils.js";
import { Core, schedulerBuscarDados, schedulerDeleteExecutionLogs } from "../services/core/tomticketCore.js";
import { checkDeConsistenciaDatabase } from "../services/core/databaseConsistencyCore.js";

const limpaLogger = () => {
    limpaArquivo("logs/server.log");
}

const chamaCore = async () => {
    await Core();
}

const buscaChamadoPorHora = async () => {
    await schedulerBuscarDados();
}

const consistenciaDatabase = async () => {
    await checkDeConsistenciaDatabase();
}

const limpaExecutionLogs = async () => {
    await schedulerDeleteExecutionLogs();
}

const schedlueLimpaArquivo = CronJob.from({
    cronTime: "0 0 * * 0",
    onTick: limpaLogger,
    start: false,
    timeZone: "America/Sao_Paulo"
});

const schedlueCore = CronJob.from({
    cronTime: "30 0 * * 0",
    onTick: chamaCore,
    start: false,
    timeZone: "America/Sao_Paulo"
});

const schedlueChamadosMonFri = CronJob.from({
    cronTime: "0 */1 * * 1-5",
    onTick: buscaChamadoPorHora,
    start: false,
    timeZone: "America/Sao_Paulo"
});

const schedlueChamadosSunSat = CronJob.from({
    cronTime: "0 1-23 * * 0,6",
    onTick: buscaChamadoPorHora,
    start: false,
    timeZone: "America/Sao_Paulo"
});

const schedlueLimpezaExecutionLogs = CronJob.from({
    cronTime: "0 0 1 * *",
    onTick: limpaExecutionLogs,
    start: false,
    timeZone: "America/Sao_Paulo"
});

const schedlueConsistenceCheck = CronJob.from({
    cronTime: "5 0 * * 0",
    onTick: consistenciaDatabase,
    start: false,
    timeZone: "America/Sao_Paulo"
});


export default function scheduler(){
    schedlueLimpaArquivo.start();
    schedlueCore.start();
    schedlueChamadosMonFri.start();
    schedlueChamadosSunSat.start();
    schedlueLimpezaExecutionLogs.start();
    schedlueConsistenceCheck.start();
}