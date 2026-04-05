const prisma = require('../prisma');

const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isBlocked: true,
      createdAt: true
    }
  });
};

const blockUser = async (userId, isBlocked) => {
  return await prisma.user.update({
    where: { id: parseInt(userId) },
    data: { isBlocked }
  });
};

const getPendingWorkers = async () => {
  return await prisma.workerProfile.findMany({
    where: { isApproved: false },
    include: {
      user: { select: { name: true, email: true } }
    }
  });
};

const approveWorker = async (profileId, isApproved) => {
  return await prisma.workerProfile.update({
    where: { id: parseInt(profileId) },
    data: { isApproved }
  });
};

const getBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      customer: { select: { name: true, email: true } },
      worker: { select: { name: true, email: true } }
    }
  });
};

const moderateBooking = async (bookingId, isHidden) => {
  return await prisma.booking.update({
    where: { id: parseInt(bookingId) },
    data: { isHidden }
  });
};

const deleteBooking = async (bookingId) => {
  return await prisma.booking.delete({
    where: { id: parseInt(bookingId) }
  });
};

const getReviews = async () => {
  return await prisma.review.findMany();
};

const moderateReview = async (reviewId, isHidden) => {
  return await prisma.review.update({
    where: { id: parseInt(reviewId) },
    data: { isHidden }
  });
};

const deleteReview = async (reviewId) => {
  return await prisma.review.delete({
    where: { id: parseInt(reviewId) }
  });
};

module.exports = {
  getUsers, blockUser,
  getPendingWorkers, approveWorker,
  getBookings, moderateBooking, deleteBooking,
  getReviews, moderateReview, deleteReview
};
