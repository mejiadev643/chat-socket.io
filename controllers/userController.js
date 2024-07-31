const { User, Message } = require('../models');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

exports.newMessage = async (req, res) => {
  const { content, UUID } = req.body;
  try {
    const message = await Message.create({
      content,
      user_id: req.userId,
    });
    res.status(201).json({ message });

  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile', message: error.message });
  }
};