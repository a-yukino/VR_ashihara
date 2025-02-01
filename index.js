const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');
const options = {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
};

const server = https.createServer(options, app).listen(3001, () =>
    console.log('HTTPS listening on 3001...')
);

// 静的ファイルのルーティング
app.use(express.static(
    path.join(__dirname, 'public')
    )
);

const io = require('socket.io')(server);

// 取得データ格納用リスト
let user_data = [];

// 一連のリアルタイム通信を実現するための仕組み　ここがスタート部分
io.sockets.on('connection', (socket) => {
    console.log('id:[' + socket.id + '] connect');
// no_2からのリクエストがあったらconsoleの部分が実行される
    socket.on('no_2_send_my_info_to_server', (msg) =>{

        let user_id = socket.id;
        let user_color = msg[0];
        let user_name = msg[1];
        let user_position = msg[2];
        let user_rotation = msg[3];

        // 自分を除いた空間内のすべてのクライアント（Webブラウザ）に情報を配信
        socket.broadcast.emit('no_3_broadcast_user_info',[user_id, user_color, user_name, user_position, user_rotation]);

        // 取得データ格納用リスト
        let now = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
        
        let time_str = now.getFullYear()
            + '/' + ('0' + (now.getMonth() + 1)).slice(-2)
            + '/' + ('0' + now.getDate()).slice(-2)
            + ' ' + ('0' + now.getHours()).slice(-2)
            + ':' + ('0' + now.getMinutes()).slice(-2)
            + ':' + ('0' + now.getSeconds()).slice(-2);
        
        // ここは、時間情報と、ユーザの位置情報を出力する部分、滞在時間を見やすい形で出したい時はコメントアウト
        console.log(time_str, user_name, user_position, user_rotation);
    
        user_data.push({time:time_str, id:user_name, position:user_position, user_rotation});
        
    });
    
    // 滞在時間を計算して、出す
    socket.on('no_3_send_my_timer_to_server', (msg) =>{
        console.log(msg);
    });

    // 接続が切れたときに実行される処理
    socket.on('disconnect', () => {
        console.log('id:[' + socket.id + '] disconnect');
        socket.broadcast.emit('no_4_broadcast_delete_ball', socket.id);
        
        let data = JSON.stringify(user_data);
        let now = new Date();
        fs.mkdirSync("./public/Data", { recursive: true});
        fs.writeFileSync("./public/Data/" + now.getTime() + " .json", data);
        console.log("取得したデータをJSONファイルに出力しました");
        
    });
});

/* 
------ Socket.IOのまとめ ---------
io.sockets.on('connection', function (socket) {

    // 自分だけに送信
    socket.emit('msg','Hello!');

    // 自分以外の他者に配信
    socket.broadcast.emit('msg','Hello!!');

    // 全員(自分も含め)に配信
    io.sockets.emit('msg','Hello!!');

    // 特定のユーザに送信
    io.sockets.socket( socket_id ).emit('msg','Hello!!' ); 
});

*/