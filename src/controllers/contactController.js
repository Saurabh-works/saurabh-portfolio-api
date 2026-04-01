const ContactMessage = require('../models/ContactMessage');

const createMessage = async (req, res) => {
  const message = await ContactMessage.create(req.body);

  res.status(201).json({
    message: 'Message received successfully',
    data: message
  });
};

const getMessages = async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
};

module.exports = { createMessage, getMessages };
