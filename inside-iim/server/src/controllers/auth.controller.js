const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/env');

function signToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, targetRole } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existing = await User.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, targetRole });
    const token = signToken(user.id);

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, targetRole: user.target_role },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken(user.id);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        targetRole: user.target_role,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      targetRole: req.user.target_role,
    },
  });
};

exports.updateGoal = async (req, res, next) => {
  try {
    const { targetRole } = req.body;
    if (!targetRole) {
      return res.status(400).json({ error: 'targetRole is required' });
    }
    const user = await User.updateTargetRole(req.user.id, targetRole);
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        targetRole: user.target_role,
      },
    });
  } catch (err) {
    next(err);
  }
};
