const consoleReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {

    directConnect: true,
    specs: ['./test_quotes.js'],
    jasmineNodeOpts: {print: () => {}}, // suppress default "dot" reporter

    onPrepare: function () {

        browser.driver.manage().window().maximize();

        // setup console reporter
        jasmine.getEnv().addReporter(
            new consoleReporter({
                spec: {
                    displayDuration: true,
                    displayStacktrace: true,
                },
                summary: {
                    displayDuration: true,
                    displayStacktrace: false,
                },
            })
        );
    }
};
