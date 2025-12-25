import db from "../config/db.js";

export const getDashboard = async (req, res) => {
  try {
    const loadsActive = await db.query(`
      SELECT COUNT(*) FROM loads WHERE status != 'Delivered'
    `);

    const tripsInTransit = await db.query(`
      SELECT COUNT(*) FROM trips WHERE status != 'Delivered'
    `);

    const invoicesPending = await db.query(`
      SELECT COUNT(*) FROM invoices WHERE status != 'Paid'
    `);

    const revenueMonth = await db.query(`
      SELECT COALESCE(SUM(amount),0) AS total
      FROM invoices
      WHERE DATE_PART('month', issue_date) = DATE_PART('month', CURRENT_DATE)
      AND DATE_PART('year', issue_date) = DATE_PART('year', CURRENT_DATE)
    `);

    const revenueByClient = await db.query(`
      SELECT clients.name, SUM(invoices.amount) AS total
      FROM invoices
      LEFT JOIN loads ON loads.id = invoices.load_id
      LEFT JOIN clients ON clients.id = loads.client_id
      GROUP BY clients.name
      ORDER BY total DESC
    `);

    const loadsByStatus = await db.query(`
      SELECT status, COUNT(*) AS total
      FROM loads
      GROUP BY status
    `);

    res.json({
      loads_active: loadsActive.rows[0].count,
      trips_in_transit: tripsInTransit.rows[0].count,
      invoices_pending: invoicesPending.rows[0].count,
      revenue_month: revenueMonth.rows[0].total,
      revenue_by_client: revenueByClient.rows,
      loads_by_status: loadsByStatus.rows
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};