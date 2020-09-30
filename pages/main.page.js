class mainPage {
    open() {
        browser.get('/');
    }

    get enterButton() {
        return $('.enterButton');
    }

    enter() {
        this.enterButton.click();
    }
}

module.exports = new mainPage();
