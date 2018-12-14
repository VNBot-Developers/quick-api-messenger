# QUICK API MESSENGER
Tự build chon bạn api gửi tin nhắn facebook một cách nhanh chóng .
## INSTALL
+ Cài đặt môi trường node js cho server của bạn :
+ Cài đặt package:
```
npm install --save quick-api-messenger
```
+ Run code

```js
const api = require('../index');
api({
    email: "EMAIL",
    password: "PASS"
}, { /*
 //nếu sài webhook thì thêm
 webhook: 'http://localhost/trywebhook/' 
 */ });
```

CHẠY THÔI
```bash
PORT=1234 node server.js
```
Trong đó 1234 là port bạn muốn server listen.

Nếu login bị lỗi vui lòng tắt xác thực và accept login trên facebook.
## HOW TO USE

Sau khi build thành công api sẽ lắng nghe request ở PORT bạn đặt.

GỬI TIN NHẮN

```
url: http://www.domain.com/sendMessage/?body=<nội dung>&target<ID người nhận>&attachment=<url ảnh hoặc âm thanh>&type<audio||image>

```
LISTEN WEBHOOK

Cấu hình url webhook như sau
```js
const api = require('../index');
api({ email: "EMAIL", password: "PASS" }, { webhook: 'http://localhost/routerWebhook/' });
```
Server webhook demo (NODEJS);
```js
const app = require('express')();
const bodyParser = require('body-parser');
const urlencodeParser = bodyParser.urlencoded({ extended: false })
const { PORT = 80 } = process.env;
app.listen(PORT, () => console.log('Listen in port', PORT));
app.post('/trywebhook', urlencodeParser, function (req, res) {
    console.log(req.body);
    res.end();
});
```
Thanks for used
## Contributors
[Trần ĐứcÝ](https://www.facebook.com/Tranducy1999)
<br>
[Trần Đức Cường](https://www.facebook.com/ShiinDz) (notekunn)