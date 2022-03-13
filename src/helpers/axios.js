import axios from "axios";
import { toast } from "react-toastify"

axios.defaults.baseURL = process.env.REACT_APP_REQUEST_BASE_URL

axios.interceptors.request.use(function (config) {

  config.requestToastId = toast.loading("Please wait...")
  config.headers.common['X-AccessToken'] = localStorage.getItem("X-AccessToken") ? localStorage.getItem("X-AccessToken") : "notoken"
  return config;

}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {

  if (response.config.method === "get") {
    toast.dismiss(response.config.requestToastId)
  }else {
    toast.update(response.config.requestToastId, {
      render: "Generic Success Message",
      type: "success",
      isLoading: false,
      autoClose: 5000,
    });
  }

  return response;

}, function (error) {

  toast.update(error.config.requestToastId, {
    render: "Generic Error Message",
    type: "error",
    isLoading: false,
    autoClose: 5000,
  });

  return Promise.reject(error);

});