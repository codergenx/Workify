const express = require('express');
const reviewController = require('../controllers/reviewController');
const { verifyToken, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/worker/:workerId', reviewController.getWorkerReviews);

router.use(verifyToken);
router.post('/', restrictTo('CUSTOMER'), reviewController.createReview);
router.put('/:id', restrictTo('CUSTOMER'), reviewController.updateCustomerReview);
router.delete('/:id', restrictTo('CUSTOMER'), reviewController.deleteCustomerReview);

module.exports = router;
