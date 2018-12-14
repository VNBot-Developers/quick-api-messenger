const api = require('../index');
api(require('../src/account.json'), { webhook: 'http://localhost/trywebhook/' });
