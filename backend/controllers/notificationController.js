// coursesController.js
const db = require("../config/database");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const ErrorHandler = require("../utils/errorHandler");
const path = require('path')
const fs = require('fs');


// Create a new notification
exports.createNotification = catchAsyncErrors(async (req, res, next) => {
  const { user_id,title, message, for_all_users } = req.body;
  const query = 'INSERT INTO notifications (user_id,title, message, for_all_users) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id || null, message, for_all_users || false], (err, result) => {
    if (err) {
      console.error("Error creating notification: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }
    res.status(201).json({ message: 'Notification created successfully', notification_id: result.insertId });
  });
});

// Get notifications for a specific user
exports.getNotificationsByUser = catchAsyncErrors(async (req, res, next) => {
  const { user_id } = req.params;
  const query = 'SELECT * FROM notifications WHERE user_id = ? OR for_all_users = TRUE';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching notifications: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }
    res.status(200).json(results);
  });
});

// Get all notifications (Admin use)
exports.getAllNotifications = catchAsyncErrors(async (req, res, next) => {
  const query = 'SELECT * FROM notifications';
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching notifications: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }
    res.status(200).json(results);
  });
});

// Get a specific notification
exports.getNotificationById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const query = 'SELECT * FROM notifications WHERE notification_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching notification: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }
    if (result.length === 0) return next(new ErrorHandler("Notification not found", 404));
    res.status(200).json(result[0]);
  });
});

// Update a notification
exports.updateNotification = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { message, for_all_users } = req.body;
  const query = 'UPDATE notifications SET message = ?, for_all_users = ? WHERE notification_id = ?';
  db.query(query, [message, for_all_users, id], (err, result) => {
    if (err) {
      console.error("Error updating notification: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }
    if (result.affectedRows === 0) return next(new ErrorHandler("Notification not found", 404));
    res.status(200).json({ message: 'Notification updated successfully' });
  });
});

// Delete a notification
exports.deleteNotification = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const query = 'DELETE FROM notifications WHERE notification_id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting notification: " + err.stack);
      return next(new ErrorHandler("Server Error", 500));
    }
    if (result.affectedRows === 0) return next(new ErrorHandler("Notification not found", 404));
    res.status(200).json({ message: 'Notification deleted successfully' });
  });
});
