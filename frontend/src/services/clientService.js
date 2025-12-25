import axios from "axios";

const API_URL = "http://localhost:4000/api/clients";

export default {
  getClients() {
    return axios.get(API_URL);
  },
  createClient(data) {
    return axios.post(API_URL, data);
  }
};