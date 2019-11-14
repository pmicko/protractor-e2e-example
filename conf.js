exports.config = {
    directConnect: true,
    specs: ['./test_quotes.js'],

    onPrepare: function () {
        browser.driver.manage().window().maximize();
    }
};
