import axios from "axios";

const API_URL = "http://localhost:4000/api/invoices";

export default {
  getInvoices() {
    return axios.get(API_URL);
  },
  createInvoice(data) {
    return axios.post(API_URL, data);
  }
};