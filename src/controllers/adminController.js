const adminService = require('../services/adminService');

const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleBlockUser = async (req, res) => {
  try {
    const user = await adminService.blockUser(req.params.id, req.body.isBlocked);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPendingWorkers = async (req, res) => {
  try {
    const profiles = await adminService.getPendingWorkers();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const setWorkerApproval = async (req, res) => {
  try {
    const profile = await adminService.approveWorker(req.params.id, req.body.isApproved);
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await adminService.getBookings();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const setBookingVisibility = async (req, res) => {
  try {
    const booking = await adminService.moderateBooking(req.params.id, req.body.isHidden);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const destroyBooking = async (req, res) => {
  try {
    await adminService.deleteBooking(req.params.id);
    res.json({ message: 'Booking deleted dynamically' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await adminService.getReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const setReviewVisibility = async (req, res) => {
  try {
    const review = await adminService.moderateReview(req.params.id, req.body.isHidden);
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const destroyReview = async (req, res) => {
  try {
    await adminService.deleteReview(req.params.id);
    res.json({ message: "Review deleted dynamically" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers, toggleBlockUser,
  getPendingWorkers, setWorkerApproval,
  getAllBookings, setBookingVisibility, destroyBooking,
  getAllReviews, setReviewVisibility, destroyReview
};
