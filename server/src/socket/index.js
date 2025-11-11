const { Server } = require("socket.io");

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`⚡ Client connected: ${socket.id}`);

    // Khi FE join vào phòng đơn hàng
    socket.on("joinOrderRoom", (orderId) => {
      socket.join(orderId);
      console.log(`📦 Client ${socket.id} joined room: ${orderId}`);
    });

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

module.exports = { initSocket };
