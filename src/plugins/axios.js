import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

axios.defaults.baseURL = process.env.VUE_APP_API_URL

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
);

axios.interceptors.response.use((response) => {
  //return response
}, (error) => {
  return Promise.reject(error.message)
});