import db from "../config/db.js";

export const InvoiceModel = {
  async getAll() {
    const result = await db.query(`
      SELECT invoices.*, 
             loads.origin_city, loads.destination_city,
             clients.name AS client_name
      FROM invoices
      LEFT JOIN loads ON loads.id = invoices.load_id
      LEFT JOIN clients ON clients.id = loads.client_id
      ORDER BY invoices.id DESC
    `);
    return result.rows;
  },

  async create(data) {
    const {
      load_id,
      amount,
      issue_date,
      due_date,
      status,
      pdf_url
    } = data;

    const result = await db.query(
      `INSERT INTO invoices 
      (load_id, amount, issue_date, due_date, status, pdf_url)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [load_id, amount, issue_date, due_date, status, pdf_url]
    );

    return result.rows[0];
  }
};