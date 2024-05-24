import axios from './axios.service';
import url from './url.service';

const serverUrl = url + '/medicines';

// export const addServiceBooking = async (obj) => {
//     let config = {
//         headers:{
//             'Content-type':"application/json",
//             "Access-control-Allow-Origin":"*"
//         }
//     }
//   return await axios.post(`${serverUrl}` ,obj, config);
// };


export const getMedicines = async (query) => {
    console.log(query);
    let config = {
        headers: {
            'Content-type': "*",
            "Access-control-Allow-Origin": "*"
        }
    }
    return await axios.get(`${serverUrl}?${query}`, config);
};

export const addMedicine = async (obj) => {
    let config = {
        headers: {
            'Content-type': "application/json",
            "Access-control-Allow-Origin": "*"
        }
    }

    return await axios.post(`${serverUrl}`, obj, config);
};



//get liked medicines

const likedMedicineUrl = url + '/frequent-medicine';



export const addLikedMedicine = async (obj) => {
    let config = {
        headers: {
            'Content-type': "application/json",
            "Access-control-Allow-Origin": "*"
        }
    }

    return await axios.post(`${likedMedicineUrl}`, obj, config);
};

export const getFromDatabaseAllLikedMedicines = async (obj) => {
    let config = {
        headers: {
            'Content-type': "application/json",
            "Access-control-Allow-Origin": "*"
        }
    }

    return await axios.get(`${likedMedicineUrl}`, obj, config);
};

export const updateLikedMedicine = async (
    id,
    name,
    time,
    frequency,
    duration,
    note,
    roa,
    doses,
    dose_form,
    duration_count,
    combination,
) => {

    let obj = {
    id,
    name,
    time,
    frequency,
    duration,
    note,
    roa,
    doses,
    dose_form,
    duration_count,
    combination,
    }
    let config = {
        headers: {
            'Content-type': "application/json",
            "Access-control-Allow-Origin": "*"
        }
    }

    return await axios.put(`${likedMedicineUrl}/${id}`,obj,  config);
};

export const deleteLikedMedicine = async (id) => {
    let config = {
        headers: {
            'Content-type': "application/json",
            "Access-control-Allow-Origin": "*"
        }
    }

    return await axios.delete(`${likedMedicineUrl}/${id}`, config);
};

