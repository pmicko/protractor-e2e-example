exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./test_quotes.js'],

    capabilities: {
        browserName: 'chrome'
    },

    allScriptsTimeout: 600000,

    onPrepare: function () {
        'use strict';
        browser.driver.manage().window().maximize();
    }
};
