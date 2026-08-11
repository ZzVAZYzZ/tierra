const asyncHandler = require("express-async-handler");
const axios = require("axios");

// @desc Send message to N8N chatbot and get response
// @route POST /api/chatbot/message
// @access Public
// @param { userId, message, limit, type }
// @result { status, message, data, category }
const sendChatbotMessage = asyncHandler(async (req, res) => {
  try {
    const { userId, message, limit = 5, type = "text" } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        status: 400,
        message: "Vui lòng nhập tin nhắn",
      });
    }

    // Forward request to N8N webhook
    const n8nUrl = process.env.N8N_WEBHOOK_URL || "http://localhost:5678/webhook-test/chatbot";
    
    const response = await axios.post(n8nUrl, {
      userId: userId || "anonymous",
      message: message.trim(),
      limit: limit,
      type: type,
      language: "vi",
      systemPrompt: "Bạn là một trợ lý AI thân thiện cho cửa hàng trang sức DG Jewelry. Luôn trả lời bằng tiếng Việt. Giúp khách hàng tìm sản phẩm, trả lời câu hỏi và cung cấp hỗ trợ khách hàng tốt nhất.",
    });

    const data = response.data;

    // If response is an array, take the first element
    const responseData = Array.isArray(data) ? data[0] : data;

    return res.status(200).json({
      status: 200,
      message: responseData?.message || "Không thể lấy phản hồi từ chatbot",
      data: responseData?.data || [],
      category: responseData?.category || null,
    });
  } catch (error) {
    console.error("Chatbot error:", error.message);
    return res.status(500).json({
      status: 500,
      message: "Lỗi khi kết nối đến chatbot. Vui lòng thử lại.",
      error: error.message,
    });
  }
});

module.exports = {
  sendChatbotMessage,
};
