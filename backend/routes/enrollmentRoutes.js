// routes/enrollments.js
const express = require('express');
const router = express.Router();
const enrollmentsController = require('../controllers/enrollmentController');

router.get('/', enrollmentsController.getAllEnrollments);
router.get('/student/:child_id', enrollmentsController.getChildReport);
router.get('/user/:user_id', enrollmentsController.getEnrollmentCourseFeeDetailsByChildId);
router.get('/:id', enrollmentsController.getEnrollmentById);
router.post('/', enrollmentsController.createEnrollment);
router.put('/:id', enrollmentsController.updateEnrollment);
router.delete('/:id', enrollmentsController.deleteEnrollment);

module.exports = router;
