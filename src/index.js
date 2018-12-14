const app = require('express')();
const { PORT = 80 } = process.env;
const login = require('facebook-chat-api');
const request = require('request')
const config = require('./config');
const json_encode = require('json_encode');
const indexRouter = require('./routers/index');
module.exports = function (account, options = {}) {
    /* 
    //Demo webhook client
    app.post('/trywebhook', require('body-parser').urlencoded({ extended: false }), function (req, res) {
        console.log(req.body);
        res.end();
    }); */
    login({ ...account }, (err, api) => {

        if (err) return console.error(err);
        api.setOptions({ ...config, ...options });
        app.get('/', indexRouter);
        app.get('/sendMessage', require('./routers/sendMessage')(api.sendMessage));
        api.listen((err, event) => {
            if (err) return;
            if (!options.webhook) return;

            return request({
                method: 'POST',
                url: options.webhook,
                headers:
                {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                form: {
                    entry: json_encode(event)
                }
            })
        })

    });
    app.listen(PORT, () => console.log('Listen in port', PORT));
}