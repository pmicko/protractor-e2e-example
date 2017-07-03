/**
 * Created by Petr Micko
 */

'use strict';

// for non-angular app - preventing protractor to wait for angular to be present when loading the test page
browser.ignoreSynchronization = true;

//Variables
var workflow_name = 'Automation Homework';
var baseURL = 'https://qa-engineer.herokuapp.com', i, j;
var quotesRequired = [  ['Awesome Quotes', 'Excellent time to become a missing person.'],
                        ['Awesome Quotes', 'Beware of low-flying butterflies.'],
                        ['Awesome Quotes', 'I love deadlines. I love the whooshing sound they make as they fly by.'],
                        ['Awesome Quotes', 'Nothing so needs reforming as other people\'s habits.'],
                        ['Awesome Quotes', 'Do something unusual today. Pay a bill.'],
                        ['Famous Quotes', 'A classic is something that everyone wants to have read and nobody wants to read.'],
                        ['Famous Quotes', 'You have the capacity to learn from mistakes. You\'ll learn a lot today.'],
                        ['Famous Quotes', 'You have taken yourself too seriously.'],
                        ['Famous Quotes', 'Yes there is a lot of people doing a great job out there.'],
                        ['Famous Quotes', 'If your life was a horse, you\'d have to shoot it.'] ];

describe(workflow_name, function () {

    it('Open browser with test page', function () {
        console.log('\nStart: ' + workflow_name);
        browser.driver.get(baseURL);
        browser.driver.sleep(2000);
        expect(browser.driver.getTitle()).toEqual('QA Engineer');
    });

    it('Main Page: submit', function () {
        element(by.id('enter')).click();
        browser.driver.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual(baseURL + '/code');
    });

    it('Code Page: get secret code and submit like a robot', function () {
        element(by.xpath("//input[@name='secret']")).getAttribute('value').then(function(secretCode){
            element(by.xpath("//input[@name='code']")).sendKeys(secretCode);
        });
        element(by.xpath("//input[@name='robot' and @type='checkbox']")).getWebElement().then(function(robotCheckBox){
            robotCheckBox.isSelected().then(function(isSelected){
                if (!isSelected){
                    robotCheckBox.click();
                }
                expect(element(by.xpath("//input[@name='robot' and @type='checkbox']")).isSelected()).toBeTruthy();
            });
        });
        element(by.xpath("//button[@type='submit']")).click();
        browser.sleep(2000);
        expect(browser.getCurrentUrl()).toEqual(baseURL + '/lists');
    });

    it('Lists page: All categories are displayed', function(){
        element(by.xpath("//strong[text()='Awesome Quotes' and parent::li[descendant::ul//li//span]]")).getWebElement().then(function(awesomeCategoryElement){
            expect(awesomeCategoryElement.isDisplayed()).toBeTruthy();
        });
        element(by.xpath("//strong[text()='Famous Quotes' and parent::li[descendant::ul//li//span]]")).getWebElement().then(function(famousCategoryElement){
            expect(famousCategoryElement.isDisplayed()).toBeTruthy();
        });
    });

    it('Lists page: All quotes are displayed within their categories, no extra quotes, no missing one', function(){
        quotesRequired.sort();
        element.all(by.xpath("//span[not(contains(@class, 'score')) and ancestor::li[child::*[text()='Awesome Quotes']]]")).getText().then(function(awesomeQuotesFounded) {
            awesomeQuotesFounded.sort();
            element.all(by.xpath("//span[not(contains(@class, 'score')) and ancestor::li[child::*[text()='Famous Quotes']]]")).getText().then(function(famousQuotesFounded) {
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

    it('Lists page: "Total score:" is the sum of all quote scores', function(){
        element.all(by.xpath("//span[contains(@class,'score')]")).getText().then(function(scores){
            var sumOfScores = 0;
            scores.forEach(function(score){
                sumOfScores += Number(score);
            });
            element(by.xpath("//body")).getText().then(function(bodyText){
                var pageTotalScore = Number(bodyText.split('Total score: ')[1]);
                expect(pageTotalScore).toEqual(sumOfScores);
            });
        });
    });

});
