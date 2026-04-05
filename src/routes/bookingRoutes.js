const express = require('express');
const bookingController = require('../controllers/bookingController');
const { verifyToken, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(verifyToken);

router.post('/', restrictTo('CUSTOMER'), bookingController.createBooking);
router.get('/', restrictTo('CUSTOMER', 'WORKER'), bookingController.getMyBookings);

router.put('/:id', restrictTo('CUSTOMER'), bookingController.updateCustomerBooking);
router.delete('/:id', restrictTo('CUSTOMER'), bookingController.deleteCustomerBooking);

router.put('/:id/status', restrictTo('WORKER'), bookingController.updateStatus);

module.exports = router;
