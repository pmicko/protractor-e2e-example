exports.config = {

    directConnect: true,
   //  seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./specs/test_quotes.js'],
    jasmineNodeOpts: {print: () => {}}, // suppress default "dot" reporter
    baseUrl: 'https://qa-homework.herokuapp.com',
    capabilities: {
        'browserName': 'chrome',
        'goog:chromeOptions': {
            args: ['headless', 'disable-gpu'],
        },
    },

    onPrepare: function () {
        // for non-angular app - prevents protractor to wait for angular to be present when loading the test page
        browser.waitForAngularEnabled(false);

        // setup console reporter
        const consoleReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(
            new consoleReporter({
                spec: {
                    displayDuration: true,
                    displayStacktrace: false,
                },
                summary: {
                    displayDuration: true,
                    displayStacktrace: false,
                },
            })
        );
    }
};
