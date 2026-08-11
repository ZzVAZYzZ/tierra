const express = require("express");
const chatbotController = require("../../controllers/chatbot.controller");

const router = express.Router();

// POST /api/chatbot/message
router.post("/chatbot/message", chatbotController.sendChatbotMessage);

module.exports = router;
