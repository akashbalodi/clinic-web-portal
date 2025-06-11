const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/InquiryController');

router.post('/', inquiryController.createInquiry);
router.get('/', inquiryController.getInquiries);
router.put('/:id', inquiryController.updateInquiryStatus);

module.exports = router;