import axios from "axios";

const API_URL = "http://localhost:4000/api/documents";

export default {
  getDocuments() {
    return axios.get(API_URL);
  },
  createDocument(data) {
    return axios.post(API_URL, data);
  }
};