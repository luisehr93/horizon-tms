import axios from "axios";

const API_URL = "http://localhost:4000/api/drivers";

export default {
  getDrivers() {
    return axios.get(API_URL);
  },
  createDriver(data) {
    return axios.post(API_URL, data);
  }
};