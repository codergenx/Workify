const prisma = require('../prisma');

const createReview = async (customerId, data) => {
  const { bookingId, rating, comment } = data;

  const booking = await prisma.booking.findUnique({
    where: { id: parseInt(bookingId) }
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.customerId !== customerId) {
    throw new Error('Not authorized to review this booking');
  }

  if (booking.status !== 'COMPLETED') {
    throw new Error('You can only review a completed booking');
  }

  const existingReview = await prisma.review.findUnique({
    where: { bookingId: parseInt(bookingId) }
  });

  if (existingReview) {
    throw new Error('You have already reviewed this booking');
  }

  return await prisma.review.create({
    data: {
      bookingId: parseInt(bookingId),
      customerId,
      workerId: booking.workerId,
      rating,
      comment
    }
  });
};

const getReviewsForWorker = async (workerId) => {
  return await prisma.review.findMany({
    where: { workerId: parseInt(workerId), isHidden: false },
    include: {
      customer: { select: { name: true, email: true } }
    }
  });
};

const updateReview = async (reviewId, customerId, data) => {
  const review = await prisma.review.findUnique({ where: { id: parseInt(reviewId) } });
  if (!review) throw new Error('Review not found');
  if (review.customerId !== customerId) throw new Error('Not authorized to update this review');

  return await prisma.review.update({
    where: { id: parseInt(reviewId) },
    data: {
      rating: data.rating,
      comment: data.comment
    }
  });
};

const deleteReviewCustomer = async (reviewId, customerId) => {
  const review = await prisma.review.findUnique({ where: { id: parseInt(reviewId) } });
  if (!review) throw new Error('Review not found');
  if (review.customerId !== customerId) throw new Error('Not authorized to delete this review');

  return await prisma.review.delete({
    where: { id: parseInt(reviewId) }
  });
};

module.exports = { createReview, getReviewsForWorker, updateReview, deleteReviewCustomer };
