// import Vue from 'vue'
import axios from 'axios'
// import VueAxios from 'vue-axios'
import store from "../store/index.js";
import router from "../router";

const instance = axios.create({
    baseURL : process.env.VUE_APP_API,
    headers: {
        "Content-type": "application/json",
        // "Authorization": "Bearer " + localStorage.getItem("token"),
      },
})

instance.interceptors.request.use(config => {
	config.headers['Authorization'] = "Bearer " + localStorage.getItem("token");
	return config;
}, function (error) {
    return Promise.reject(error.response.data);
});

instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401) {
        store.dispatch('logout');
        router.replace('/')
    }
    return Promise.reject(error.response);
  });

// Vue.use(VueAxios, instance)
export default instance

