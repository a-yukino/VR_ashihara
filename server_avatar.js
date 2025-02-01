const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 静的ファイルを提供
app.use(express.static("public")); // publicフォルダ内のファイルを提供

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // 自分のアバターの位置データを受信
  socket.on("send_my_pos", (data) => {
    // ログを追加
    console.log(`Received send_my_pos from ${socket.id}`);

    // 受け取ったアバターの位置データを送信元のクライアントを除くすべてのクライアントにブロードキャスト
    socket.broadcast.emit("update_your_pos", [
      socket.id,
      data[0], // color
      data[1], // name
      data[2], // position
      data[3], // quaternion
    ]);
  });

  // 表情データを受信
  socket.on("expressionUpdate", (data) => {
    try {
      // データの検証
      if (data && typeof data.expression === "string" && data.id) {
        // ログを追加
        console.log(`Received expressionUpdate from ${socket.id}:`, data);

        // 他のクライアントに表情データを送信
        socket.broadcast.emit("update_expression", data);
      } else {
        console.warn("Invalid expressionUpdate data received:", data);
      }
    } catch (error) {
      console.error("Error handling expressionUpdate:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    // 他のクライアントにユーザー削除を通知
    socket.broadcast.emit("remove_user", socket.id);
  });
});

// サーバーの起動
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
