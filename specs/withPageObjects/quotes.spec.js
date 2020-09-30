const assets = require('../../assets/testData');
const mainPage = require('../../pages/main.page');
const codePage = require('../../pages/code.page');
const listsPage = require('../../pages/lists.page');

describe('Automation Example (with page objects)', () => {

    it('Main page - Should open browser with loaded main page', () => {
        mainPage.open();
        expect(browser.getTitle()).toEqual('QA Engineer');
    });

    it('Main Page - Submit leads user to code page', () => {
        mainPage.enter();
        expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}/code`);
    });

    it('Code Page - Get secret code and submit like a robot', () => {
        codePage.typeSecretValue();
        codePage.selectRobotCheckbox();
        codePage.submit();
        expect(browser.getCurrentUrl()).toEqual(`${browser.baseUrl}/lists`);
    });

    it('Lists page - All categories are displayed', () => {
        listsPage.quotesHeaders.each(header => expect(['Famous quotes', 'Awesome quotes']).toContain(header.getText()));
    });

    it('Lists page - All quotes are displayed within their categories, no extra quotes, no missing one', () => {
        const awesomeQuotesRequired = assets.quotes.awesome.sort();
        const famousQuotesRequired = assets.quotes.famous.sort();

        listsPage.getAwesomeQuotes().then(awesomeQuotesFounded => {
            awesomeQuotesFounded.sort();
            listsPage.getFamousQuotes().then(famousQuotesFounded => {
                famousQuotesFounded.sort();

                expect(awesomeQuotesFounded).toEqual(awesomeQuotesRequired);
                expect(famousQuotesFounded).toEqual(famousQuotesRequired);
            });
        });
    });

    it('Lists page - Total score is the sum of all quote scores', () => {
        expect(listsPage.getRenderedTotalScore()).toEqual(listsPage.calculateSumOfScores());
    });

});
