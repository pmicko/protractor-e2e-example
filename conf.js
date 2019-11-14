const consoleReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {

    directConnect: true,
    specs: ['./specs/test_quotes.js'],
    jasmineNodeOpts: {print: () => {}}, // suppress default "dot" reporter

    onPrepare: function () {
        browser.driver.manage().window().maximize();

        // for non-angular app - prevents protractor to wait for angular to be present when loading the test page
        browser.waitForAngularEnabled(false);

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
