import axios from "axios";

const API_URL = "http://localhost:4000/api/loads";

export default {
  getLoads() {
    return axios.get(API_URL);
  },
  createLoad(data) {
    return axios.post(API_URL, data);
  }
};