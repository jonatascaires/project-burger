import axios from "axios";
import Cookie from 'js-cookie';

const domain = "https://spendlittle.herokuapp.com/api/v1";

const token = Cookie.get('burgerProjectToken');

const api = axios.create({
  baseURL: domain,
  headers: {
    "Authorization": `Bearer ${token}`,
    "Accept": 'application/json',
    "Content-Type":  'application/json'
  }
});

export default api;
