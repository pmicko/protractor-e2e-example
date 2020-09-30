class ListsPage {
    get quotesHeaders() {
        return $$('ul h2');
    }

    get awesomeListItems() {
        return $$('ul[qa-id=Awesome] span:not(.score)');
    }

    get famousListItems() {
        return $$('ul[qa-id=Famous] span:not(.score)');
    }

    get scores() {
        return $$('span[class*=score]');
    }

    getAwesomeQuotes() {
        return this.awesomeListItems.getText();
    }

    getFamousQuotes() {
        return this.famousListItems.getText();
    }

    calculateSumOfScores() {
        return this.scores.getText().then(scores => {
            let sumOfScores = 0;
            scores.forEach(score => sumOfScores += Number(score));
            return sumOfScores;
        });
    }

    getRenderedTotalScore() {
        return $('body').getText().then(bodyText => Number(bodyText.split('Total score: ')[1]));
    }
}

module.exports = new ListsPage();
