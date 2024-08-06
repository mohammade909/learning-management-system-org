const express = require('express')
const { addFee, getAllFees } = require('../controllers/feeController')
const router = express.Router()
const {  isAuthenticatedUser } = require("../middlewares/authMiddleware");

router.post('/add', addFee)
router.get('/', isAuthenticatedUser, getAllFees)
module.exports =router