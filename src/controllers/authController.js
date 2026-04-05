const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { register, login };
