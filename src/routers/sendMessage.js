const fs = require('fs');
const request = require('request');
const md5 = require('md5')
saveAudio = (url) => new Promise((resolve, reject) => {
    var path = __dirname + `/temp/${md5(url)}.mp3`;
    request(url).pipe(fs.createWriteStream(path)).on('close', (err, data) => {
        if (!err) {

            resolve(path)
        }
        else {

            reject()
        }
    });
})
saveImage = (url) => new Promise((resolve, reject) => {
    var path = __dirname + `/temp/${md5(url)}.png`;
    request(url).pipe(fs.createWriteStream(path)).on('close', (err, data) => {
        if (!err) {

            resolve(path)
        }
        else {

            reject()
        }
    });
})

module.exports = function (api) {
    return function (req, res) {
        const { body, attachment, type, target = 4 } = req.query;
        sendMessage = (a, b, c) => api(a, b || target, function (err, messageInfo) {
            res.json({ error: err, ...messageInfo })
        })

        if (!!body && !attachment) return sendMessage(body || 'hi');
        if (!body && !attachment) return res.json({ error: 'Can\'t find body param' });
        switch (type) {
            case 'audio':
                return saveAudio(attachment)
                    .then((path) => {
                        cons
                        sendMessage({
                            body,
                            attachment: fs.createReadStream(path)
                        });
                        return path;
                    })
                    .then(fs.unlinkSync)
                    .catch(() => sendMessage(body || 'hi'))
                break;
            case 'image':
                return saveImage(attachment)
                    .then((path) => {
                        sendMessage({
                            body,
                            attachment: fs.createReadStream(path)
                        });
                        return path;
                    })
                    .then(fs.unlinkSync)
                    .catch((e) => {
                        sendMessage(body || 'hi')
                        console.log(e)
                    })
                break;

            default:
                return sendMessage(body || 'hi');
                break;
        }
    }
}