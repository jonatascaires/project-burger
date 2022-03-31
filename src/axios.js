import axios from "axios";

const domain = "http://localhost:3000";

const api = axios.create({
  baseURL: domain,
  headers: {
    authorization: localStorage.getItem("accessToken")
  }
});

export default api;
