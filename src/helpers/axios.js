import axios from "axios";
import { toast } from "react-toastify"

axios.defaults.baseURL = process.env.REACT_APP_REQUEST_BASE_URL

let toastId;
axios.interceptors.request.use(function (config) {

  toastId = toast.loading("Please wait...")
  config.headers.common['X-AccessToken'] = localStorage.getItem("X-AccessToken") ? localStorage.getItem("X-AccessToken") : "notoken"
  return config;

}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {

  toast.update(toastId, {
    render: "Generic Success Message",
    type: "success",
    isLoading: false,
    autoClose: 5000,
  });
  return response;

}, function (error) {

  toast.update(toastId, {
    render: "Generic Error Message",
    type: "error",
    isLoading: false,
    autoClose: 5000,
  });

  return Promise.reject(error);

});