import axios from "axios";
import axiosRetry from "axios-retry";
import 'dotenv/config';
import { logger } from "../utils/logger.js";

axiosRetry(axios, { 
    retries: 3, 
    retryDelay: (retryCount) => {
        logger.warn(`Tentativa: ${retryCount}`);
        return retryCount * 3000; 
    },
    retryCondition: (error) => {
      return error.response.status === 429; 
  },
  });

const options = {
  headers: {
    Authorization: process.env.API_TOKEN
  }
}

async function handler (endpoint, pageNumber = "1", query, queryValue){

  const urlParams = new URLSearchParams({page: pageNumber});
  if (query && queryValue) {
    urlParams.append(query, queryValue);
  }

  const urlRequest = `${process.env.URL_API_DEFAULT}${endpoint}/list?${urlParams.toString()}`;

  try {
    return await axios.get(urlRequest, options);

  } catch (err) {
    return err;
  }
}

export async function getTomticketApi(endpoint, pageNumber, query, queryValue) {

  const request = await handler(endpoint, pageNumber, query, queryValue);
  
  if (!(request.data)){
    const error = request.response.data
    return error;
  }
  else{
    const data = request.data; 
    return data;
  }
}
  

async function handlerIndividual(endpoint, id) {
  return await axios.get(`${process.env.URL_API_DEFAULT}${endpoint}/detail?ticket_id=${id}`, {
    headers: {
      Authorization: process.env.API_TOKEN
    }
  });
}

export async function getTomticketApiIndividual(endpoint, id) {
  const request = await handlerIndividual(endpoint, id);

  const data = request.data;

  return data;
}

