const bookingService = require('../services/bookingService');

const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.user.id, req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getBookingsByUser(req.user.id, req.user.role);
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const booking = await bookingService.updateBookingStatus(req.params.id, req.user.id, req.body.status);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCustomerBooking = async (req, res) => {
  try {
    const booking = await bookingService.updateBooking(req.params.id, req.user.id, req.body);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCustomerBooking = async (req, res) => {
  try {
    await bookingService.deleteBooking(req.params.id, req.user.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createBooking, getMyBookings, updateStatus, updateCustomerBooking, deleteCustomerBooking };
