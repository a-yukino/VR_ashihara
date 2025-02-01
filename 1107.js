// ExpressとSocketIOをインポート
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const socketIO = require("socket.io");
const https = require("https");

// 取得データ格納用リスト
let users_motion = [];
let transcripts = {}; // 存储每个用户的语音文字信息

// SSL証明書の設定
const options = {
  key: fs.readFileSync("ssl/key.pem"),
  cert: fs.readFileSync("ssl/cert.pem"),
};


// HTTPSサーバの作成とポート3001でのリッスン
const server = https
  .createServer(options, app)
  .listen(3001, () => console.log("HTTPS listening on 3001..."));

// SocketIOサーバの作成
const io = socketIO(server);

const userInfo = {}

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, "public")));

// クライアントとの接続イベント
io.sockets.on("connection", (socket) => {
  console.log("id:[" + socket.id + "] connect");

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