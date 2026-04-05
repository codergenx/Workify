const profileService = require('../services/profileService');

const createProfile = async (req, res) => {
  try {
    const profile = await profileService.createProfile(req.user.id, req.body);
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profile = await profileService.updateProfile(req.user.id, req.body);
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await profileService.getProfile(req.params.id);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const searchProfiles = async (req, res) => {
  try {
    const profiles = await profileService.searchProfiles(req.query);
    res.json(profiles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    await profileService.deleteProfile(req.user.id);
    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createProfile, updateProfile, getProfile, searchProfiles, deleteProfile };
