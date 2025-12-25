import axios from "axios";

const API_URL = "http://localhost:4000/api/dashboard";

export default {
  getDashboard() {
    return axios.get(API_URL);
  }
};