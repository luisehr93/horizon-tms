import db from "../config/db.js";

export const LoadModel = {
  async getAll() {
    const result = await db.query(`
      SELECT loads.*, clients.name AS client_name
      FROM loads
      LEFT JOIN clients ON clients.id = loads.client_id
      ORDER BY loads.id DESC
    `);
    return result.rows;
  },

  async create(data) {
    const {
      client_id,
      origin_city,
      origin_state,
      destination_city,
      destination_state,
      pickup_datetime,
      delivery_datetime,
      rate,
      status,
      notes
    } = data;

    const result = await db.query(
      `INSERT INTO loads 
      (client_id, origin_city, origin_state, destination_city, destination_state, pickup_datetime, delivery_datetime, rate, status, notes)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [
        client_id,
        origin_city,
        origin_state,
        destination_city,
        destination_state,
        pickup_datetime,
        delivery_datetime,
        rate,
        status,
        notes
      ]
    );

    return result.rows[0];
  }
};