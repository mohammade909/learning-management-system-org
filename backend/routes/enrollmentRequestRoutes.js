const express = require('express');
const router = express.Router();
const enrollmentRequestController = require('../controllers/enrollmentRequestController');

router.get('/requests', enrollmentRequestController.getAllRequests);
router.post('/requests', enrollmentRequestController.createRequest);
router.put('/requests/status', enrollmentRequestController.updateRequestStatus);
router.post('/requests/approve', enrollmentRequestController.approveRequest);
router.delete('/requests/:request_id', enrollmentRequestController.deleteRequest);

module.exports = router;
