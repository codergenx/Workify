const express = require('express');
const adminController = require('../controllers/adminController');
const { verifyToken, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(verifyToken, restrictTo('ADMIN'));

router.get('/users', adminController.getAllUsers);
router.put('/users/:id/block', adminController.toggleBlockUser);

router.get('/workers/pending', adminController.getPendingWorkers);
router.put('/workers/:id/approve', adminController.setWorkerApproval);

router.get('/bookings', adminController.getAllBookings);
router.put('/bookings/:id/visibility', adminController.setBookingVisibility);
router.delete('/bookings/:id', adminController.destroyBooking);

router.get('/reviews', adminController.getAllReviews);
router.put('/reviews/:id/visibility', adminController.setReviewVisibility);
router.delete('/reviews/:id', adminController.destroyReview);

module.exports = router;
