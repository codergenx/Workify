const prisma = require('../prisma');

const createProfile = async (userId, data) => {
  const existingProfile = await prisma.workerProfile.findUnique({ where: { userId } });
  if (existingProfile) {
    throw new Error('Worker profile already exists for this user');
  }

  return await prisma.workerProfile.create({
    data: {
      userId,
      skills: data.skills || [],
      location: data.location,
      pricePerHour: data.pricePerHour,
      fixedRate: data.fixedRate,
      isApproved: false // Admin must approve
    }
  });
};

const updateProfile = async (userId, data) => {
  return await prisma.workerProfile.update({
    where: { userId },
    data
  });
};

const getProfile = async (id) => {
  const profile = await prisma.workerProfile.findUnique({
    where: { id: parseInt(id) },
    include: {
      user: {
        select: { name: true, email: true, phone: true }
      }
    }
  });
  if (!profile) {
    throw new Error('Profile not found');
  }
  return profile;
};

const searchProfiles = async (query) => {
  const { location, skill } = query;
  
  const filters = {
    isApproved: true,
    user: {
      isBlocked: false
    }
  };

  if (location) {
    filters.location = { contains: location, mode: 'insensitive' };
  }
  if (skill) {
    filters.skills = { has: skill };
  }

  return await prisma.workerProfile.findMany({
    where: filters,
    include: {
      user: {
        select: { name: true, email: true }
      }
    }
  });
};

const deleteProfile = async (userId) => {
  return await prisma.workerProfile.delete({
    where: { userId: parseInt(userId) }
  });
};

module.exports = { createProfile, updateProfile, getProfile, searchProfiles, deleteProfile };
