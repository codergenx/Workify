const reviewService = require('../services/reviewService');

const createReview = async (req, res) => {
  try {
    const review = await reviewService.createReview(req.user.id, req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getWorkerReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsForWorker(req.params.workerId);
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCustomerReview = async (req, res) => {
  try {
    const review = await reviewService.updateReview(req.params.id, req.user.id, req.body);
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCustomerReview = async (req, res) => {
  try {
    await reviewService.deleteReviewCustomer(req.params.id, req.user.id);
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createReview, getWorkerReviews, updateCustomerReview, deleteCustomerReview };
