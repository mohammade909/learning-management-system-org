const db = require("../config/database");
const bcrypt = require('bcrypt');

exports.getAllRequests = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM enrollment_requests');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new enrollment request
exports.createRequest = async (req, res) => {
  const { student_name, student_mobile, student_email, course_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO enrollment_requests (student_name, student_mobile, student_email, course_id) VALUES (?, ?, ?, ?)',
      [student_name, student_mobile, student_email, course_id]
    );
    res.status(201).json({ request_id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update the status of an enrollment request
exports.updateRequestStatus = async (req, res) => {
  const { request_id, status } = req.body;
  try {
    await db.query('UPDATE enrollment_requests SET status = ? WHERE request_id = ?', [status, request_id]);
    res.json({ message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve an enrollment request
exports.approveRequest = async (req, res) => {
  const { request_id, student_name, student_email, course_id } = req.body;
  const defaultPassword = '123456in';
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  try {
    // Create a new user
    const [userResult] = await db.query(
      'INSERT INTO users (username, password, email, first_name, last_name, user_type) VALUES (?, ?, ?, ?, ?, ?)',
      [student_email, hashedPassword, student_email, student_name, '', 'student']
    );

    // Create an enrollment
    const [enrollmentResult] = await db.query(
      'INSERT INTO enrollments (course_id, child_id, enrollment_date) VALUES (?, ?, NOW())',
      [course_id, userResult.insertId]
    );

    // Delete the request
    await db.query('DELETE FROM enrollment_requests WHERE request_id = ?', [request_id]);

    res.json({ message: 'Request approved and enrollment created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an enrollment request
exports.deleteRequest = async (req, res) => {
  const { request_id } = req.params;
  try {
    await db.query('DELETE FROM enrollment_requests WHERE request_id = ?', [request_id]);
    res.json({ message: 'Request deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
