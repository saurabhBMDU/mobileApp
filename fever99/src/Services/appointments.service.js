import axios from './axios.service';
import url from './url.service';

const serverUrl = url + '/appointments';

export const addAppointments = async (obj) => {
    let config = {
        headers:{
            'Content-type':"application/json",
            "Access-control-Allow-Origin":"*"
        }
    }
  let temp = await axios.post(`${serverUrl}`, obj ,  config);
    console.log(temp);
    return temp
  //   return await axios.post(`${serverUrl}`, obj ,  config);
};



export const updateAppointments = async (id,obj) => {
    let config = {
        headers:{
            'Content-type':"application/json",
            "Access-control-Allow-Origin":"*"
        }
    }
  return await axios.put(`${serverUrl}/${id}`,obj, config);
};

export const updateAppointmentCallStatus= async (id,obj) => {
    let config = {
        headers:{
            'Content-type':"application/json",
            "Access-control-Allow-Origin":"*"
        }
    }
  return await axios.put(`${serverUrl}-call-status/${id}`,obj, config);
};


export const getAppointments = async (query) => {
    console.log(`${serverUrl}?${query}`);
    console.log('query in api hit ',query);
    let config = {
        headers:{
            'Content-type':"*",
            "Access-control-Allow-Origin":"*"
        }
    }
  return await axios.get(`${serverUrl}?${query}` , config);
};
export const getAppointmentById = async (id) => {
    let config = {
        headers:{
            'Content-type':"*",
            "Access-control-Allow-Origin":"*"
        }
    }
  return await axios.get(`${serverUrl}/${id}` , config);
};




export const DownloadInvoiceFile = async (id) => {
    let config = {
        headers:{
            'Content-type':"*",
            "Access-control-Allow-Origin":"*"
        }
    }
  return await axios.get(`${url}/invoice` , config);
};


export const DownloadSingleInvoice = async (id) => {
    let config = {
        headers:{
            'Content-type':"*",
            "Access-control-Allow-Origin":"*"
        }
    }
  return await axios.get(`${url}/transaction-invoice/${id}` , config);
};

