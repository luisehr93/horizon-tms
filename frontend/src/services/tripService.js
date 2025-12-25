import axios from "axios";

const API_URL = "http://localhost:4000/api/trips";

export default {
  getTrips() {
    return axios.get(API_URL);
  },
  createTrip(data) {
    return axios.post(API_URL, data);
  }
};