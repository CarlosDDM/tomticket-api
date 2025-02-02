import { createCustomer,
  createExecutionLogs,
  createOrganization,
  createTicket,
  createTicketIndividual,
  creteCategory,
  creteDepartment,
  creteOperator,
  deleteAllExecutionLogs,
  deleteTicket,
  readAllCategorys,
  readAllCustomers,
  readAllDepartments,
  readAllOperators,
  readAllOrganizations,
  readAllTickets,
  readExecutionLogs,
  scheduleCreateTicket,
  updateCategory,
  updateCustomer,
  updateDepartment,
  updateOperator,
  updateOrganization,
  updateTicket } from "../../database/tomticketDatabase.js";
import { logger } from "../../utils/logger.js";
import { FormatadorDeData, stringifyObjeto } from "../../utils/serviceUtils.js";


const stateEnum = {
  notModified: 0,
  update: 1,
  create: 2
}

export async function setTickets (dataApi) {

  let ticketList = [];
  
  const customers = await readAllCustomers();
  const tickets = await readAllTickets();

  for (const ticket of dataApi){
    const customerId = validaClienteExiste(ticket.customer.email, customers);

    if (customerId !== undefined){
      const ticketDesserialized = {
        id: ticket.id,
        protocol: ticket.protocol,
        subject: ticket.subject,
        message: ticket.message,
        customer_id: customerId,
        priority: ticket.priority,
        ticket_type: ticket.ticket_type,
        creation_date: ticket.creation_date,
        end_date: ticket.end_date,
        situation_id: ticket.situation.id,
        category_id: ticket.category.id,
        department_id: ticket.department.id,
        operator_id: ticket.operator.id,
      };
  
      const alternativa = validaObjetoExistente(
        ticketDesserialized,
        tickets,
        (ticketDesserialized) => ticketDesserialized.id
      );
  
      const infoTicket = {
        notModified: `O ticket: ${ticketDesserialized.id}, já existe e não precisa de modificação.`,
        update: `O ticket: ${ticketDesserialized.id}, será atualizado.`,
        create: `O ticket: ${ticketDesserialized.id}, sera adicionados a lista de inclusão.`
      }
      
      const switchCase = await validaCaseGenerico(
        alternativa,
        ticketDesserialized,
        updateTicket,
        infoTicket);
  
      Array.isArray(switchCase) ? ticketList = [...ticketList, ...switchCase] : undefined;
    }
    else{
      logger.error(`Não foi possivel criar o chamado: ${ticketData.id}, contudo sera adicionado na proxima validação de consistencia do banco.`);
    }
  }
  await createTicket(ticketList);

}

export async function setOrganizations (dataApi) {

  let organizationList = []
  const organizations = await readAllOrganizations();

  for (const organization of dataApi){

    const organizationDesserialized = {
      id: organization.id,
      name: organization.name
    };

    const alternativa = validaObjetoExistente(
      organizationDesserialized,
      organizations,
      (organizationDesserialized) => organizationDesserialized.id
     );
     
    
     const infoOrganization = {
      notModified: `A organização: ${organizationDesserialized.id}, já existe e não precisa de modificação.`,
      update: `A organização: ${organizationDesserialized.id}, será atualizado.`,
      create: `A organização: ${organizationDesserialized.id}, sera adicionados a lista de inclusão.`
    }

    const switchCase = await validaCaseGenerico(
      alternativa,
      organizationDesserialized,
      updateOrganization,
      infoOrganization
    );
    
    Array.isArray(switchCase) ? organizationList = [...organizationList, ...switchCase] : undefined;
  }
  await createOrganization(organizationList);
}

export async function setCustomers (dataApi) {

  /*
    Esse é o padrão que podera ser utilizado para adicionar os atendentes ao customer
    para não gerar problemas a criação de chamados internos.

    mude o uuid para o que for da sua organização criada no proprio tomticket
    
    customerList[{
      name: "nome Atendente",
      email: "atendente@example.com",
      organization_id: "uuid"
    },]
  */ 

  let customerList = [];

  const customers = await readAllCustomers({
    name: true, email: true, organization_id: true});
  for (const customer of dataApi) {

    const customerDesserialized = {
      name: customer.name,
      email: customer.email,
      internal_id: customer.internal_id,
      organization_id: customer.organization.id
    };
    
    const alternativa = validaObjetoExistente(
      customerDesserialized,
      customers,
      (customerDesserialized) => customerDesserialized.email
    );

    const infoCustomer = {
      notModified: `O usuário: ${customerDesserialized.email}, já existe e não precisa de modificação.`,
      update: `O usuário: ${customerDesserialized.email}, será atualizado.`,
      create: `O usuário: ${customerDesserialized.email}, sera adicionados a lista de inclusão.`
    }

    const switchCase = await validaCaseGenerico(
      alternativa,
      customerDesserialized,
      updateCustomer,
      infoCustomer
    );

    Array.isArray(switchCase) ? customerList = [...customerList, ...switchCase] : undefined;
  }
  await createCustomer(customerList);
}

export async function setDepartments(dataApi) {

  let departmentList = [];
  const departments = await readAllDepartments();

  for (const department of dataApi) {

    const departmentDesserialized = {
      id: department.department.id,
      name: department.department.name
    };

    const alternativa = validaObjetoExistente(
      departmentDesserialized,
      departments,
      (departmentDesserialized) => departmentDesserialized.id
    );

    const infoDepartment = {
      notModified: `O departamento: ${departmentDesserialized.id}, já existe e não precisa de modificação.`,
      update: `O departamento: ${departmentDesserialized.id}, será atualizado.`,
      create: `O departamento: ${departmentDesserialized.id}, sera adicionados a lista de inclusão.`
    }

    const switchCase = await validaCaseGenerico(
      alternativa,
      departmentDesserialized,
      updateDepartment,
      infoDepartment
    );

    Array.isArray(switchCase) ? departmentList = [...departmentList, ...switchCase] : undefined;
  };
  await creteDepartment(departmentList);
}

export async function setOperators(dataApi) {
  let operatorList = [];
  const operators = await readAllOperators();

  for (const operator of dataApi) {

    const operatorDesserialized = {
      id: operator.operator.id,
      name: operator.operator.name
    };

    const alternativa = validaObjetoExistente(
      operatorDesserialized,
      operators,
      (operatorDesserialized) => operatorDesserialized.id
    );

    const infoOperator = {
      notModified: `O operator: ${operatorDesserialized.id}, já existe e não precisa de modificação.`,
      update: `O operator: ${operatorDesserialized.id}, será atualizado.`,
      create: `O operator: ${operatorDesserialized.id}, sera adicionados a lista de inclusão.`
    }

    if (operatorDesserialized.id !== null){
      const switchCase = await validaCaseGenerico(
        alternativa,
        operatorDesserialized,
        updateOperator,
        infoOperator
      );
  
      Array.isArray(switchCase) ? operatorList = [...operatorList, ...switchCase] : undefined;
    }
  };
  await creteOperator(operatorList);
}

export async function setCategory(dataApi) {
  let categoryList = [];
  const categorys = await readAllCategorys();

  for (const category of dataApi) {
    const categoryDesserialized = {
      id: category.category.id,
      name: category.category.name
    };

    const alternativa = validaObjetoExistente(
      categoryDesserialized,
      categorys,
      (categoryDesserialized) => categoryDesserialized.id
    );

    const infoCategory = {
      notModified: `A category: ${categoryDesserialized.id}, já existe e não precisa de modificação.`,
      update: `A category: ${categoryDesserialized.id}, será atualizado.`,
      create: `A category: ${categoryDesserialized.id}, sera adicionados a lista de inclusão.`
    }

    if (category.category.id !== null){
      const switchCase = await validaCaseGenerico(
        alternativa,
        categoryDesserialized,
        updateCategory,
        infoCategory
      );
  
      Array.isArray(switchCase) ? categoryList = [...categoryList, ...switchCase] : undefined;
    }
  };
  await creteCategory(categoryList);
}

export async function setTicketIndividual(webhookActionData, ticketData){
  const customers = await readAllCustomers();
  const userId = await validaClienteExiste(ticketData.customer.email, customers);

  let ticketDesserialized = {
    id: ticketData.id,
    protocol: ticketData.protocol,
    subject: ticketData.subject,
    message: ticketData.message,
    customer_id: "",
    priority: ticketData.priority,
    ticket_type: ticketData.ticket_type,
    creation_date: ticketData.creation_date,
    end_date: ticketData.end_date,
    situation_id: ticketData.situation.id,
    category_id: ticketData.category.id,
    department_id: ticketData.department.id,
    operator_id: ticketData.operator.id,
  };
  
  if (userId !== undefined){
    ticketDesserialized.customer_id(userId);
  } else{
    return logger.error(`Não foi possivel criar o chamado: ${ticketData.id}, contudo sera adicionado na proxima validação de consistencia do banco.`);
  }

  switch (webhookActionData) {
    case "created":
      await createTicketIndividual(ticketDesserialized);
      break;

    case "deleted":
      await deleteTicket(ticketDesserialized.id);
      break;

    case "updated":
      await updateTicket(ticketDesserialized);
      break;
  }
}

export async function setDate() {
  const date = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", timeZoneName: 'longOffset'});
  const dateHour = date.replace(",", "")
    .replace("GMT", "")
    .slice(10, 19);

  const timeZone = date.slice(-6)
    .replace(":", "");
  
  const dateConvert = FormatadorDeData(date.slice(0, 10));

  const dataFormatada = `${dateConvert}${dateHour}${timeZone}`
  return dataFormatada;
}

export async function setExecutionLogs(dataExecutionLogs) {
  await createExecutionLogs(dataExecutionLogs);
}

export async function setTicketSchedule(ticketData) {
  const tickets = await readAllTickets();
  const customers = await readAllCustomers();

  for(const ticket of ticketData){
    const findTicket = tickets.find(ticketExistente => ticketExistente.id === ticket.id);
    
    if (findTicket !== undefined){
      const customerId = validaClienteExiste(ticket.customer.email, customers);

      const ticketDesserialized = {
        id: ticket.id,
        protocol: ticket.protocol,
        subject: ticket.subject,
        message: ticket.message,
        customer_id: customerId,
        priority: ticket.priority,
        ticket_type: ticket.ticket_type,
        creation_date: ticket.creation_date,
        end_date: ticket.end_date,
        situation_id: ticket.situation.id,
        category_id: ticket.category.id,
        department_id: ticket.department.id,
        operator_id: ticket.operator.id,
      };

      if (stringifyObjeto(ticketDesserialized) !== stringifyObjeto(findTicket)){
        await updateTicket(ticketDesserialized);
      }
    }else{
      await scheduleCreateTicket(ticket);
    }
  }
}

export async function delExecutionLogs() {
  await deleteAllExecutionLogs();
}

export async function validaDate(result){
  const executionLog = await readExecutionLogs(result);

  if(executionLog !== undefined && executionLog !== null){
    return executionLog.dateFormated;
  }
  else{
    return undefined;
  }
}

function validaClienteExiste(email, customers){
  const findCostumer = customers.find(costumer => costumer.email === email);

  if (findCostumer !== undefined){
    return findCostumer.id;
  }
  else {
    return logger.error(`Usuário com o email: ${email}.\nAinda não existe ele sera inserido na proxima validações de usuário.`);
  }
}

function validaObjetoExistente(
  entidadeDesserialized,
  listaObjetos,
  idenficadorCallback) {
  if (listaObjetos !== undefined){
    const findObjeto = listaObjetos.find(objeto => idenficadorCallback(objeto) === idenficadorCallback(entidadeDesserialized));
    if (findObjeto !== undefined && stringifyObjeto(findObjeto) === stringifyObjeto(entidadeDesserialized)){
      return stateEnum.notModified;
    }
    else if (findObjeto !== undefined && stringifyObjeto(findObjeto) !== stringifyObjeto(entidadeDesserialized)){
      return stateEnum.update;
    }
    else{
      return stateEnum.create;
    }
  } else{
    return stateEnum.create;
  }
}

async function validaCaseGenerico(
  alternativa,
  entidadeDesserialized,
  updateCallback,
  objetoInfo
) {

  switch (alternativa) {
    case stateEnum.notModified:
      break;
    case stateEnum.update:
      logger.info(objetoInfo.update);
      await updateCallback(entidadeDesserialized);
      break;
    case stateEnum.create:
      logger.info(objetoInfo.create);
      let objetoArray = [];
      objetoArray.push(entidadeDesserialized);
      return objetoArray;
  }
}
