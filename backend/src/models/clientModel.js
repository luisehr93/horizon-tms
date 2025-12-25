import db from "../config/db.js";

export const ClientModel = {
  async getAll() {
    const result = await db.query("SELECT * FROM clients ORDER BY id DESC");
    return result.rows;
  },

  async create(data) {
    const {
      name,
      contact_name,
      phone,
      email,
      address,
      payment_terms,
      notes
    } = data;

    const result = await db.query(
      `INSERT INTO clients 
      (name, contact_name, phone, email, address, payment_terms, notes)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [name, contact_name, phone, email, address, payment_terms, notes]
    );

    return result.rows[0];
  }
};