import db from "../config/db.js";

export const TripModel = {
  async getAll() {
    const result = await db.query(`
      SELECT trips.*, 
             loads.origin_city, loads.destination_city,
             drivers.name AS driver_name,
             trucks.unit_number AS truck_unit
      FROM trips
      LEFT JOIN loads ON loads.id = trips.load_id
      LEFT JOIN drivers ON drivers.id = trips.driver_id
      LEFT JOIN trucks ON trucks.id = trips.truck_id
      ORDER BY trips.id DESC
    `);
    return result.rows;
  },

  async create(data) {
    const {
      load_id,
      driver_id,
      truck_id,
      dispatch_time,
      arrival_pickup,
      depart_pickup,
      arrival_delivery,
      depart_delivery,
      status
    } = data;

    const result = await db.query(
      `INSERT INTO trips 
      (load_id, driver_id, truck_id, dispatch_time, arrival_pickup, depart_pickup, arrival_delivery, depart_delivery, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        load_id,
        driver_id,
        truck_id,
        dispatch_time,
        arrival_pickup,
        depart_pickup,
        arrival_delivery,
        depart_delivery,
        status
      ]
    );

    return result.rows[0];
  }
};