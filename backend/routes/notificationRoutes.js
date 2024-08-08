const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/notifications', notificationController.createNotification);
router.get('/notifications', notificationController.getAllNotifications);
router.get('/notifications/:id', notificationController.getNotificationById);
router.put('/notifications/:id', notificationController.updateNotification);
router.delete('/notifications/:id', notificationController.deleteNotification);
router.get('/user-notifications/:user_id', notificationController.getNotificationsByUser);

module.exports = router;
