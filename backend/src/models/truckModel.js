import db from "../config/db.js";

export const TruckModel = {
  async getAll() {
    const result = await db.query("SELECT * FROM trucks ORDER BY id DESC");
    return result.rows;
  },

  async create(data) {
    const {
      unit_number,
      plate,
      vin,
      type,
      status
    } = data;

    const result = await db.query(
      `INSERT INTO trucks 
      (unit_number, plate, vin, type, status)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [unit_number, plate, vin, type, status]
    );

    return result.rows[0];
  }
};