exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./test_quotes.js'],

    onPrepare: function () {
        browser.driver.manage().window().maximize();
    }
};
