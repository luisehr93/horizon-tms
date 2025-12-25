import axios from "axios";

const API_URL = "http://localhost:4000/api/trucks";

export default {
  getTrucks() {
    return axios.get(API_URL);
  },
  createTruck(data) {
    return axios.post(API_URL, data);
  }
};