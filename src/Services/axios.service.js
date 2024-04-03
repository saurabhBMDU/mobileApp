import axios from 'axios';
import { AUTH_TOKEN } from '../utils/constant';
import { deleteJwt, getJwt } from './user.service';
export const axiosAuth = axios.create();

axiosAuth.interceptors.request.use(
  async function (config) {
    const token = await getJwt()
    if (typeof token != 'undefined' && token !== null) {
      config.headers['Authorization'] = `${token}`
    }
    // console.log(JSON.stringify(config, null, 2), "config")
    return config;

  },
  async function (error) {
<<<<<<< HEAD
    // if (error.response.status === 401) {
    //   // trigger logout or refresh token
    //   // localStorage.removeItem(AUTH_TOKEN)
    //   // await deleteJwt()
    //   // window.location.href = '/'
    // }
    // return Promise.reject(error);
=======
    if (error.response.status === 401) {
      // trigger logout or refresh token
      // localStorage.removeItem(AUTH_TOKEN)
      // await deleteJwt()
      // window.location.href = '/'
    }
    return Promise.reject(error);
>>>>>>> ca29d5332fcd17e86ff03ba7c016d4b7b78b9a4c
  },
);

axiosAuth.interceptors.response.use(
<<<<<<< HEAD
  // response => {
  //   return response;
  // },
  // async error => {
  //   if (error.response && error.response.status === 401) {
  //     // trigger logout  or refresh token
  //     // console.error("LOGOUT", error.response)
  //     // localStorage.removeItem(AUTH_TOKEN)
  //     await deleteJwt()
  //     // window.location.href = '/'
  //   }
  //   return Promise.reject(error);
  // },
=======
  response => {
    return response;
  },
  async error => {
    if (error.response && error.response.status === 401) {
      // trigger logout  or refresh token
      // console.error("LOGOUT", error.response)
      // localStorage.removeItem(AUTH_TOKEN)
      // await deleteJwt()
      // window.location.href = '/'
    }
    return Promise.reject(error);
  },
>>>>>>> ca29d5332fcd17e86ff03ba7c016d4b7b78b9a4c
);

export default axiosAuth;