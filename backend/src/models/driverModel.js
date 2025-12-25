import db from "../config/db.js";

export const DriverModel = {
  async getAll() {
    const result = await db.query("SELECT * FROM drivers ORDER BY id DESC");
    return result.rows;
  },

  async create(data) {
    const {
      name,
      phone,
      email,
      cdl_number,
      status,
      notes
    } = data;

    const result = await db.query(
      `INSERT INTO drivers 
      (name, phone, email, cdl_number, status, notes)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [name, phone, email, cdl_number, status, notes]
    );

    return result.rows[0];
  }
};