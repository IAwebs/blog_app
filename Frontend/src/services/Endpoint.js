


import axios from "axios";

export const BaseUrl = "https://blog-app-1-xtt3.onrender.com";

const instance = axios.create({
  baseURL: BaseUrl,
});

// 👉 REQUEST INTERCEPTOR (ATTACH JWT)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // JWT saved after login

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request Config:", config);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// 👉 RESPONSE INTERCEPTOR
instance.interceptors.response.use(
  (response) => {
    console.log("API Response:", response);
    return response;
  },
  (error) => {
    console.log(
      "API Error:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

// API helpers
export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const delet = (url) => instance.delete(url);
export const patch = (url, data) => instance.patch(url, data);

export default instance;
