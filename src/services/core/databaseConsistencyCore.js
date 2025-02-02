import { deleteTicket, readAllTickets } from "../../database/tomticketDatabase.js";
import { logger } from "../../utils/logger.js";
import { getTomticketApi } from "../ConnectionService.js";

export async function checkDeConsistenciaDatabase() {

    logger.info("Iniciando teste de consistencia.");
    let databaseApiData = [];

    const data = await getTomticketApi("ticket");
    let listPages = { pages: data.pages };

    do {
        const dataTicket = await getTomticketApi("ticket", listPages.pages)
        const dataTicketApiDesserialized = dataTicket.data.map(ticket => ticket.id);
        databaseApiData = [...databaseApiData,...dataTicketApiDesserialized];
        listPages.pages--;
    } while (listPages.pages > 0);

    const ticketInDatabase = await readAllTickets({id: true});

    const ticketsId = new Set(databaseApiData);

    const ticketCompara = ticketInDatabase
    .filter(ticket => !ticketsId.has(ticket.id))
    .map(ticket => deleteTicket(ticket.id));

    await Promise.all(ticketCompara);

    logger.info("Teste de consistencia realizado com sucesso.");
    
}