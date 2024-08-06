const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");

const dotenv = require("dotenv");

const db = require("../config/database");

dotenv.config();

exports.addFee = catchAsyncErrors(async (req, res, next) => {
  const {
    child_id,
    course_id,
    fee_amount,
    due,
    paid,
    status,
    payment_date,
    payment_method,
  } = req.body;

  // Validate required fields
  if (!child_id || !course_id || !fee_amount || !due || !status) {
    return next(new ErrorHandler("Required fields are missing", 400));
  }

  // Create SQL query
  const sql = `
      INSERT INTO fees (child_id, course_id, fee_amount, due, paid, status, payment_date, payment_method, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

  // Execute the query
  db.query(
    sql,
    [
      child_id,
      course_id,
      fee_amount,
      due,
      paid,
      status,
      payment_date,
      payment_method,
    ],
    (err, result) => {
      if (err) {
        console.error("Error during insertion:", err);
        return next(new ErrorHandler("Error during insertion", 500));
      }

      // Check if insertion was successful
      if (result.affectedRows > 0) {
        res.status(201).json({
          success: true,
          message: "Fee entry added successfully",
          data: { fee_id: result.insertId, ...req.body },
        });
      } else {
        next(new ErrorHandler("Insertion failed", 500));
      }
    }
  );
});
exports.getAllFees = catchAsyncErrors(async (req, res, next) => {
  // Create SQL query
  const sql = "SELECT * FROM fees";

  // Execute the query
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during fetching:", err);
      return next(new ErrorHandler("Error during fetching", 500));
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  });
});
