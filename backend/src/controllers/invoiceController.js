import { InvoiceModel } from "../models/invoiceModel.js";

export const getInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceModel.getAll();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const newInvoice = await InvoiceModel.create(req.body);
    res.json(newInvoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};