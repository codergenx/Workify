const express = require('express');
const profileController = require('../controllers/profileController');
const { verifyToken, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', profileController.searchProfiles);
router.get('/:id', profileController.getProfile);

// Protected routes (WORKER only)
router.use(verifyToken, restrictTo('WORKER'));
router.post('/', profileController.createProfile);
router.put('/', profileController.updateProfile);
router.delete('/', profileController.deleteProfile);

module.exports = router;
