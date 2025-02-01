const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// publicディレクトリを静的ファイルとして公開する
app.use(express.static(path.join(__dirname, 'public')));

// サーバを起動する
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
