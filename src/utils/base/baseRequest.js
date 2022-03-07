import Vue from "vue";
import axios from 'axios';

Vue.prototype.$axios = axios;
axios.defaults.baseURL='http://81.69.220.4:9070';
// axios.defaults.baseURL='http://192.168.1.110:9070';


axios.interceptors.request.use((config) => {
	config.headers.token = localStorage.getItem('token');;
	return config;
});

const http =axios.create({})

http.interceptors.request.use(function(config){
    if ((config.url !='/login'||config.url!='/regist'||config.url!='/getLoginMedia')&&localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token');
      }
    return config;
})

http.interceptors.response.use(function(response){
    return response.data;
})





export default http;