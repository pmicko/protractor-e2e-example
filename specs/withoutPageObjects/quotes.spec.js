const assets = require('../../assets/testData');

describe('Automation Example (without page objects)', () => {

    it('Main page - Open browser with test page', () => {
        browser.get('/');
        expect(browser.getTitle()).toEqual('QA Engineer');
    });

    it('Main Page - Submit', () => {
        $('.enterButton').click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/code');
    });

    it('Code Page - Get secret code and submit like a robot', () => {
        $('input[name=secret]').getAttribute('value').then(secretCode => {
            $('input[name=code]').sendKeys(secretCode);
        });

        $('input[name=isRobot]').getWebElement().then(robotCheckBox => {
            robotCheckBox.isSelected().then(isSelected => {
                if (!isSelected) robotCheckBox.click();
                expect($('input[name=isRobot]').isSelected()).toBeTruthy();
            });
        });
        element(by.buttonText('Submit')).click();
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/lists');
    });

    it('Lists page - All categories are displayed', () => {
        $$('ul h2').each(headerElement => {
            expect([ 'Famous quotes', 'Awesome quotes' ]).toContain(headerElement.getText())
        });
    });

    it('Lists page - All quotes are displayed within their categories, no extra quotes, no missing one', () => {
        const awesomeQuotesRequired = assets.quotes.awesome.sort();
        const famousQuotesRequired = assets.quotes.famous.sort();

        $$('ul[qa-id=Awesome] span:not(.score)').getText().then(awesomeQuotesFounded => {
            awesomeQuotesFounded.sort();
            $$('ul[qa-id=Famous] span:not(.score)').getText().then(famousQuotesFounded => {
                famousQuotesFounded.sort();

                expect(awesomeQuotesFounded).toEqual(awesomeQuotesRequired);
                expect(famousQuotesFounded).toEqual(famousQuotesRequired);
            });
        });
    });

    it('Lists page - Total score is the sum of all quote scores', () => {
        $$('span[class*=score]').getText().then(scores => {
            let sumOfScores = 0;
            scores.forEach(score => sumOfScores += Number(score));

            $('body').getText().then(bodyText => {
                const pageTotalScore = Number(bodyText.split('Total score: ')[1]);
                expect(pageTotalScore).toEqual(sumOfScores);
            });
        });
    });

});
