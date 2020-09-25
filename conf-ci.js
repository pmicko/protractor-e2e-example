const { config } = require('./conf');

exports.config = {
    ...config,
    ...{
        capabilities: {
            'browserName': 'chrome',
            'goog:chromeOptions': {
                args: ['headless', 'disable-gpu'],
            },
        },
    }
}
