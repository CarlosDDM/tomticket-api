import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger.js";

const prisma = new PrismaClient();

export async function creteDepartment(dataApi) {
    try {
        await prisma.department.createMany({ 
            data: dataApi,
            skipDuplicates: true
        });
    } catch (err){
       return logger.error(`Problema ao criar um departament \n\n${err}`);
    }
}

export async function creteOperator(dataApi) {
    try{
        await prisma.operator.createMany({
            data: dataApi,
            skipDuplicates: true
        });
    } catch (err){
      return logger.error(`Problema ao criar os operators \n\n${err}`);
        
    }
}

export async function updateOperator(operatorData){
  try {
    await prisma.operator.update({
      where: {
        id: operatorData.id
      },
      data: operatorData
    });

    return logger.info(`Sucesso na atualização do operator: ${categoryData.id}`);
  } catch (err) {
    return logger.error(`Algo deu errado na atualização do operator:${categoryData.id} \n\n${err}`);
  }
}

export async function creteCategory(dataApi){
    try{
        await prisma.category.createMany({
            data: dataApi,
            skipDuplicates: true
        });
    } catch(err){
      return logger.error(`Problema ao criar category \n\n${err}`);
        
    }
}

export async function readAllCategorys() {
    try {
      return await prisma.category.findMany();
  
    }catch(err){
     return logger.error(`Algo deu errado na busca da Category \n\n${err}`);
    }
}

export async function updateCategory(categoryData){
  try {
    await prisma.category.update({
      where: {
        id:categoryData.id
      },
      data: categoryData
    });

    return logger.info(`Sucesso na atualização do category: ${categoryData.id}`);
  } catch (err) {
    return logger.error(`Algo deu errado na atualização da category:${categoryData.id} \n\n${err}`);
  }
}

export async function readAllDepartments() {
  try {
      return await prisma.department.findMany();

  }catch(err){
      return logger.error(`Algo deu errado na busca da Department \n\n${err}`);
  }
}

export async function updateDepartment(departmentData) {
  try {
    await prisma.department.update({
      where: {
        id: departmentData.id
      },
      data: departmentData
    });

    return logger.info(`Sucesso na atualização do department: ${departmentData.id}`);

  } catch (err) {
    return logger.error(`Algo deu errado no atualização do department: ${departmentData.id}\n\n${err}`);
  }
}

export async function readAllOperators() {
  try {
      return await prisma.operator.findMany();

  }catch(err){
      return logger.error(`Algo deu errado na busca da Operator \n\n${err}`);
  }
}

export async function createTicket(ticketData) {
    try
    {
      await prisma.ticket.createMany({
          data: ticketData,
          skipDuplicates: true
      });
    }
    catch(err){
      return logger.error(`Algo deu errado na criação do Ticket\n\n ${err}`);
    }
}

export async function createTicketIndividual(ticketData) {
  try
  {
    await prisma.ticket.create({
      data: ticketData
    });

    return logger.info(`Foi um sucesso a criação do ticket: ${ticketData.id}`);
  } catch (err) {
    return logger.error(`Problema na criação individual do ticket: ${ticketData.id}, \n\n${err}`)
  }
}

export async function readAllTickets(selectDefault = {
  id: true, protocol:true, subject: true,
  message: true, customer_id: true, priority: true,
  ticket_type: true, creation_date:true, end_date: true,
  situation_id: true, category_id: true, department_id: true,
  operator_id: true
}) {
  try {
    return prisma.ticket.findMany({
      select: selectDefault
    });
    
  } catch (err){
    return logger.error(`Algo deu errado na leitura de todos os tickets \n\n${err}`);
  }
}

export async function updateTicket(ticketData) {
  try{
    await prisma.ticket.update({
      where:{
        id: ticketData.id,
      },
      data: ticketData
    });
    return logger.info(`Sucesso na atualização do ticket: ${ticketData.id}`);

  } catch(err){
    return logger.error(`Algo deu errado no update\n ${err}`);
    
  }
}

export async function deleteTicket(ticketId){
  try {
    await prisma.ticket.delete({
      where: {
        id: ticketId
      }
    });

    return logger.info(`Foi feita a exclusão com sucesso do ticket: ${ticketId}`);
    
  } catch (err) {
    return logger.error(`Não pode ser deletado o ticket: ${ticketId}.\n\n${err}`);
  }
}

export async function createOrganization (organizationData) {
  try {
    await prisma.organization.createMany({
      data: organizationData,
      skipDuplicates: true
    });

    }catch(err){
    return logger.error(`$Algo deu errado na criação da Organization. \n\n ${err}`);
  }
}

export async function readAllOrganizations() {
  try {
    return await prisma.organization.findMany();
  }catch(err){
    return logger.error(`Algo deu errado na busca das Organizations. \n\n${err}`);
  }
}

export async function updateOrganization(organizationData) {
  try {
    await prisma.organization.update({
      where: {
        id: organizationData.id
      },
      data: dataApi
    });
    return logger.info(`Sucesso na atualização da organization: ${organizationData.id}`);

  } catch (err) {
    return logger.error(`Algo deu errado na atualização da Organization: ${organizationData.id}\n\n ${err}`);
  }
}

export async function readAllCustomers(selectDefault = 
  {id: true, name: true, email: true,
    internal_id: true, organization_id: true}
  ) {
  try {
    return await prisma.customer.findMany({
      select: selectDefault
    });

  }catch(err){
    return logger.error(`Algo deu errado na busca da Organização \n\n${err}`);
  }
}

export async function createCustomer(customerData) {
  try {
    await prisma.customer.createMany({ 
      data: customerData,
      skipDuplicates: true
    });

  } catch (err) {
    return logger.error(`Algo deu errado na criação do Customer\n\n${err}`);    
  }
}


export async function updateCustomer(customerData) {
  try {
    await prisma.customer.update({
      where: {
        email: customerData.email
      },
      data: customerData
    });

    return logger.info(`Sucesso na atualização do customer: ${customerData.email}`);
  } catch (err) {
    return logger.info(`Algo deu errado na atualização do customer: ${customerData.email}.\n\n${err}`)
  }
}

export async function createExecutionLogs (dataExecutionLogs){
  try {
    await prisma.executionLog.create({
      data: dataExecutionLogs
    })
  } catch (err) {
    logger.error(`Problema na criação no log de execução. \n${err}`)
  }
}

export async function scheduleCreateTicket(ticketData){

  try {

    const ticketPreenchido = validaTipoInsercao(ticketData);
    
    await prisma.ticket.create({
      data: ticketPreenchido
    });
    return logger.info(`Ticket: ${ticketPreenchido.id}, criado com sucesso.`);
  } catch (err) {
    return logger.error(`Ticket: ${ticketPreenchido.id}, com erro ${err}.`);
    
  }

}

export async function readExecutionLogs(resultExecutonLogs){
  try {
    return await prisma.executionLog.findFirst({
      where: {
        result: resultExecutonLogs
      },
      orderBy:{
        dateFormated: "desc"
      }
    });
  } catch (err) {
    return logger.error(`Erro na busca do log.\n${err}`);
  }
}

export async function deleteAllExecutionLogs() {
  try {
    await prisma.executionLog.deleteMany();
    return logger.info()
  } catch (err) {
    return logger.error(`Erro na deleção dos execution logs.\n${err}`);
  }
}

function validaTipoInsercao(ticketData) {
  let ticketCompleto;

  if (ticketData.operator.id !== null 
    && ticketData.category.id !== null 
    && ticketData.customer.organization.id !== null){
      
     ticketCompleto = {
      id: ticketData.id,
      protocol: ticketData.protocol,
      subject: ticketData.subject,
      message: ticketData.message,
      customer: {
        connectOrCreate:{
          where: {
            email: ticketData.customer.email
          },
          create: {
            name: ticketData.customer.name,
            email: ticketData.customer.email,
            organization:{
              connectOrCreate: {
                where: {
                  id: ticketData.customer.organization.id
                },
                create:{
                  id: ticketData.customer.organization.id,
                  name: ticketData.customer.organization.name
                }
              }
            }
          }
        }
      },
      priority: ticketData.priority,
      ticket_type: ticketData.ticket_type,
      creation_date: ticketData.creation_date,
      end_date: ticketData.end_date,
      situation_id: ticketData.situation.id,
      category: {
        connectOrCreate: {
          where: {
            id: ticketData.category.id
          },
          create: {
            id: ticketData.category.id,
            name: ticketData.category.name
          }
        }
      },
      department: {
        connectOrCreate:{
          where: {
            id: ticketData.department.id
          },
          create: {
            id: ticketData.department.id,
            name: ticketData.department.name
          }
        }
      },
      operator: {
        connectOrCreate: {
          where: {
            id: ticketData.operator.id
          },
          create: {
            id: ticketData.operator.id,
            name: ticketData.operator.name
          }
        }
      }
    }

    return ticketCompleto;
  }
  else if (ticketData.operator.id === null 
    && ticketData.category.id === null 
    && ticketData.customer.organization.id !== null){
    ticketCompleto = {
      id: ticketData.id,
      protocol: ticketData.protocol,
      subject: ticketData.subject,
      message: ticketData.message,
      customer: {
        connectOrCreate:{
          where: {
            email: ticketData.customer.email
          },
          create: {
            name: ticketData.customer.name,
            email: ticketData.customer.email,
            organization:{
              connectOrCreate: {
                where: {
                  id: ticketData.customer.organization.id
                },
                create:{
                  id: ticketData.customer.organization.id,
                  name: ticketData.customer.organization.name
                }
              }
            }

          }
        }
      },
      priority: ticketData.priority,
      ticket_type: ticketData.ticket_type,
      creation_date: ticketData.creation_date,
      end_date: ticketData.end_date,
      situation_id: ticketData.situation.id,
      department: {
        connectOrCreate:{
          where: {
            id: ticketData.department.id
          },
          create: {
            id: ticketData.department.id,
            name: ticketData.department.name
          }
        }
      }
    }

    return ticketCompleto;
  }
  else if (ticketData.operator.id === null 
    && ticketData.category.id !== null 
    && ticketData.customer.organization.id !== null){

      ticketCompleto = {
        id: ticketData.id,
        protocol: ticketData.protocol,
        subject: ticketData.subject,
        message: ticketData.message,
        customer: {
          connectOrCreate:{
            where: {
              email: ticketData.customer.email
            },
            create: {
              name: ticketData.customer.name,
              email: ticketData.customer.email,
              organization:{
                connectOrCreate: {
                  where: {
                    id: ticketData.customer.organization.id
                  },
                  create:{
                    id: ticketData.customer.organization.id,
                    name: ticketData.customer.organization.name
                  }
                }
              }
            }
          }
        },
        priority: ticketData.priority,
        ticket_type: ticketData.ticket_type,
        creation_date: ticketData.creation_date,
        end_date: ticketData.end_date,
        situation_id: ticketData.situation.id,
        category: {
          connectOrCreate: {
            where: {
              id: ticketData.category.id
            },
            create: {
              id: ticketData.category.id,
              name: ticketData.category.name
            }
          }
        },
        department: {
          connectOrCreate:{
            where: {
              id: ticketData.department.id
            },
            create: {
              id: ticketData.department.id,
              name: ticketData.department.name
            }
          }
        }
      }
      return ticketCompleto;
  }
  else if (ticketData.operator.id !== null 
    && ticketData.category.id !== null 
    && ticketData.customer.organization.id === null){
      
      ticketCompleto = {
        id: ticketData.id,
        protocol: ticketData.protocol,
        subject: ticketData.subject,
        message: ticketData.message,
        customer: {
          connectOrCreate:{
            where: {
              email: ticketData.customer.email
            },
            create: {
              name: ticketData.customer.name,
              email: ticketData.customer.email,
            }
          }
        },
        priority: ticketData.priority,
        ticket_type: ticketData.ticket_type,
        creation_date: ticketData.creation_date,
        end_date: ticketData.end_date,
        situation_id: ticketData.situation.id,
        category: {
          connectOrCreate: {
            where: {
              id: ticketData.category.id
            },
            create: {
              id: ticketData.category.id,
              name: ticketData.category.name
            }
          }
        },
        department: {
          connectOrCreate:{
            where: {
              id: ticketData.department.id
            },
            create: {
              id: ticketData.department.id,
              name: ticketData.department.name
            }
          }
        },
        operator: {
          connectOrCreate: {
            where: {
              id: ticketData.operator.id
            },
            create: {
              id: ticketData.operator.id,
              name: ticketData.operator.name
            }
          }
        }
      }
      return ticketCompleto;
  }else if (ticketData.operator.id !== null 
    && ticketData.category.id === null 
    && ticketData.customer.organization.id !== null){
      
      ticketCompleto = {
        id: ticketData.id,
        protocol: ticketData.protocol,
        subject: ticketData.subject,
        message: ticketData.message,
        customer: {
          connectOrCreate:{
            where: {
              email: ticketData.customer.email
            },
            create: {
              name: ticketData.customer.name,
              email: ticketData.customer.email,
              organization:{
                connectOrCreate: {
                  where: {
                    id: ticketData.customer.organization.id
                  },
                  create:{
                    id: ticketData.customer.organization.id,
                    name: ticketData.customer.organization.name
                  }
                }
              }
            }
          }
        },
        priority: ticketData.priority,
        ticket_type: ticketData.ticket_type,
        creation_date: ticketData.creation_date,
        end_date: ticketData.end_date,
        situation_id: ticketData.situation.id,
        department: {
          connectOrCreate:{
            where: {
              id: ticketData.department.id
            },
            create: {
              id: ticketData.department.id,
              name: ticketData.department.name
            }
          }
        },
        operator: {
          connectOrCreate: {
            where: {
              id: ticketData.operator.id
            },
            create: {
              id: ticketData.operator.id,
              name: ticketData.operator.name
            }
          }
        }
      }
  
      return ticketCompleto;
  }
  
}
