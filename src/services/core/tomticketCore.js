import { logger } from "../../utils/logger.js";
import { getTomticketApi, getTomticketApiIndividual } from "../ConnectionService.js";
import { delExecutionLogs, setCategory,
    setCustomers,
    setDate,
    setDepartments,
    setExecutionLogs,
    setOperators,
    setOrganizations,
    setTicketIndividual,
    setTickets,
    setTicketSchedule, 
    validaDate} from "../tomticketApi/tickets.js";

const resultadoEnum = {
    success: "Sucesso",
    fail: "Falhou"
}

export async function Core () {
    await organizationCore();
    await customerCore();
    await genericCore();

}

export async function schedulerBuscarDados(){
    const date = await setDate();
    const executionLog = {
        dateFormated: date,
        result: "",
        error: null
    }
    
    try {
        const lastDate = await validaDate(resultadoEnum.success);

        if (lastDate !== undefined){

            const data = await getTomticketApi("ticket", undefined, "last_update_ge", lastDate);
            let lastPage = {pages: data.pages};
            
            do {
                const dataTicket = await getTomticketApi("ticket", lastPage.pages, "last_update_ge", lastDate);
                await setTicketSchedule(dataTicket.data);
                lastPage.pages--;
            } while (lastPage.pages > 0)

            executionLog.result = resultadoEnum.success;
            await setExecutionLogs(executionLog);
        }else{
            logger.info("Inserção da base de dados completa.");
            executionLog.result = resultadoEnum.success;
            await setExecutionLogs(executionLog);
        }
    } catch (err) {
        executionLog.result = resultadoEnum.fail;
        executionLog.error = err.toString();
        await setExecutionLogs(executionLog);  
    }
}

async function customerCore() {
    const data = await getTomticketApi("customer");
    let listPages = { pages: data.pages };

    do {
        const dataCustomer = await getTomticketApi("customer",listPages.pages);
        await setCustomers(dataCustomer.data);
        listPages.pages--;
    } while (listPages.pages > 0)
}

async function organizationCore() {
    const data = await getTomticketApi("organization");
    let listPages = {pages: data.pages};

    do {
        const dataOrganization = await getTomticketApi("organization", listPages.pages)
        await setOrganizations(dataOrganization.data);
        listPages.pages--;
    } while (listPages.pages > 0)
}

async function genericCore() {
    const data = await getTomticketApi("ticket");
    const listPages = {pages: data.pages};

    do {
        const dataGeneric = await getTomticketApi("ticket", listPages.pages);
        const promiseDepartments = setDepartments(dataGeneric.data);
        const promiseOperators = setOperators(dataGeneric.data);
        const promiseCategory = setCategory(dataGeneric.data);
        const promiseTickets= setTickets(dataGeneric.data);

        await Promise.all([
            promiseDepartments,
            promiseOperators,
            promiseCategory,
            promiseTickets
        ]);

        listPages.pages--;
    }while (listPages.pages > 0)

}

export async function schedulerDeleteExecutionLogs() {
    await delExecutionLogs();
}

export async function CoreIndividual (data){

    const requestData = await getTomticketApiIndividual(data.type, data.id);
    await setTicketIndividual(data.action ,requestData.data);
}

