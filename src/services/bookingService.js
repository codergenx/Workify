const prisma = require('../prisma');

const createBooking = async (customerId, data) => {
  const { workerId, serviceDate, message } = data;
  
  const worker = await prisma.user.findUnique({
    where: { id: parseInt(workerId) },
    include: { workerProfile: true }
  });

  if (!worker || worker.role !== 'WORKER' || !worker.workerProfile?.isApproved) {
    throw new Error('Worker not available or not properly registered.');
  }

  return await prisma.booking.create({
    data: {
      customerId,
      workerId: parseInt(workerId),
      serviceDate: new Date(serviceDate),
      message,
      status: 'PENDING'
    }
  });
};

const getBookingsByUser = async (userId, role) => {
  const whereClause = role === 'CUSTOMER' ? { customerId: userId } : { workerId: userId };

  return await prisma.booking.findMany({
    where: whereClause,
    include: {
      customer: { select: { name: true, email: true } },
      worker: { select: { name: true, email: true } },
      review: true
    }
  });
};

const updateBookingStatus = async (bookingId, workerId, status) => {
  const booking = await prisma.booking.findUnique({ where: { id: parseInt(bookingId) } });

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.workerId !== workerId) {
    throw new Error('Unauthorized to update this booking status');
  }

  return await prisma.booking.update({
    where: { id: parseInt(bookingId) },
    data: { status }
  });
};

const updateBooking = async (bookingId, customerId, data) => {
  const booking = await prisma.booking.findUnique({ where: { id: parseInt(bookingId) } });
  if (!booking) throw new Error('Booking not found');
  if (booking.customerId !== customerId) throw new Error('Not authorized to update this booking');
  if (booking.status !== 'PENDING') throw new Error('Can only update PENDING bookings');

  return await prisma.booking.update({
    where: { id: parseInt(bookingId) },
    // Customer can only safely modify message or date
    data: {
      message: data.message,
      serviceDate: data.serviceDate ? new Date(data.serviceDate) : undefined
    }
  });
};

const deleteBooking = async (bookingId, customerId) => {
  const booking = await prisma.booking.findUnique({ where: { id: parseInt(bookingId) } });
  if (!booking) throw new Error('Booking not found');
  if (booking.customerId !== customerId) throw new Error('Not authorized to delete this booking');
  if (booking.status !== 'PENDING') throw new Error('Can only cancel PENDING bookings, otherwise ask Admin or wait for completion');

  return await prisma.booking.delete({
    where: { id: parseInt(bookingId) }
  });
};

module.exports = { createBooking, getBookingsByUser, updateBookingStatus, updateBooking, deleteBooking };
