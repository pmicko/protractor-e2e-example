const workflow_name = 'Automation Homework';
const baseURL = 'https://qa-engineer.herokuapp.com';
let i, j;
const quotesRequired = [  ['Awesome Quotes', 'Excellent time to become a missing person.'],
                        ['Awesome Quotes', 'Beware of low-flying butterflies.'],
                        ['Awesome Quotes', 'I love deadlines. I love the whooshing sound they make as they fly by.'],
                        ['Awesome Quotes', 'Nothing so needs reforming as other people\'s habits.'],
                        ['Awesome Quotes', 'Do something unusual today. Pay a bill.'],
                        ['Famous Quotes', 'A classic is something that everyone wants to have read and nobody wants to read.'],
                        ['Famous Quotes', 'You have the capacity to learn from mistakes. You\'ll learn a lot today.'],
                        ['Famous Quotes', 'You have taken yourself too seriously.'],
                        ['Famous Quotes', 'Yes there is a lot of people doing a great job out there.'],
                        ['Famous Quotes', 'If your life was a horse, you\'d have to shoot it.'] ];

describe(workflow_name, () => {

    it('Open browser with test page', () => {
        console.log('\nStart: ' + workflow_name);
        browser.driver.get(baseURL);
        browser.driver.sleep(2000);
        expect(browser.driver.getTitle()).toEqual('QA Engineer');
    });

    it('Main Page: submit', () => {
        element(by.id('enter')).click();
        browser.driver.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual(baseURL + '/code');
    });

    it('Code Page: get secret code and submit like a robot', () => {
        element(by.xpath("//input[@name='secret']")).getAttribute('value').then(secretCode => {
            element(by.xpath("//input[@name='code']")).sendKeys(secretCode);
        });
        element(by.xpath("//input[@name='robot' and @type='checkbox']")).getWebElement().then(robotCheckBox => {
            robotCheckBox.isSelected().then(isSelected => {
                if (!isSelected) robotCheckBox.click();
                expect(element(by.xpath("//input[@name='robot' and @type='checkbox']")).isSelected()).toBeTruthy();
            });
        });
        element(by.xpath("//button[@type='submit']")).click();
        browser.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual(baseURL + '/lists');
    });

    it('Lists page: All categories are displayed', () => {
        element(by.xpath("//strong[text()='Awesome Quotes' and parent::li[descendant::ul//li//span]]")).getWebElement().then(awesomeCategoryElement => {
            expect(awesomeCategoryElement.isDisplayed()).toBeTruthy();
        });
        element(by.xpath("//strong[text()='Famous Quotes' and parent::li[descendant::ul//li//span]]")).getWebElement().then(famousCategoryElement => {
            expect(famousCategoryElement.isDisplayed()).toBeTruthy();
        });
    });

    it('Lists page: All quotes are displayed within their categories, no extra quotes, no missing one', () => {
        quotesRequired.sort();
        element.all(by.xpath("//span[not(contains(@class, 'score')) and ancestor::li[child::*[text()='Awesome Quotes']]]")).getText().then(awesomeQuotesFounded => {
            awesomeQuotesFounded.sort();
            element.all(by.xpath("//span[not(contains(@class, 'score')) and ancestor::li[child::*[text()='Famous Quotes']]]")).getText().then(famousQuotesFounded => {
                famousQuotesFounded.sort();
                for (i=0; i < quotesRequired.length; i++){
                    if (quotesRequired[i][0]==='Awesome Quotes'){
                        expect(quotesRequired[i][1]).toEqual(awesomeQuotesFounded[i]);
                    }
                    else if (quotesRequired[i][0]==='Famous Quotes'){
                        j = i - awesomeQuotesFounded.length;
                        expect(quotesRequired[i][1]).toEqual(famousQuotesFounded[j]);
                    }
                }
            });
        });
    });

    it('Lists page: "Total score:" is the sum of all quote scores', () => {
        element.all(by.xpath("//span[contains(@class,'score')]")).getText().then(scores => {
            let sumOfScores = 0;
            scores.forEach(score => {
                sumOfScores += Number(score);
            });
            element(by.xpath("//body")).getText().then(bodyText => {
                const pageTotalScore = Number(bodyText.split('Total score: ')[1]);
                expect(pageTotalScore).toEqual(sumOfScores);
            });
        });
    });

});
