import db from "../config/db.js";

export const DocumentModel = {
  async getAll() {
    const result = await db.query(`
      SELECT documents.*, trips.id AS trip_number
      FROM documents
      LEFT JOIN trips ON trips.id = documents.trip_id
      ORDER BY documents.id DESC
    `);
    return result.rows;
  },

  async create(data) {
    const {
      trip_id,
      document_type,
      file_url,
      notes
    } = data;

    const result = await db.query(
      `INSERT INTO documents 
      (trip_id, document_type, file_url, notes)
      VALUES ($1,$2,$3,$4)
      RETURNING *`,
      [trip_id, document_type, file_url, notes]
    );

    return result.rows[0];
  }
};