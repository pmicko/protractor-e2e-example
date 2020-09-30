class CodePage{
    get secretCode() {
        return $('input[name=secret]').getAttribute('value');
    }

    get codeInput() {
        return $('input[name=code]');
    }

    get robotCheckbox() {
        return $('input[name=isRobot]');
    }

    get submitButton() {
        return element(by.buttonText('Submit'));
    }

    selectRobotCheckbox() {
        this.robotCheckbox.isSelected().then(isSelected => {
            if (!isSelected) this.robotCheckbox.click();
        })
    }

    typeSecretValue() {
        this.secretCode.then(secretCode => this.codeInput.sendKeys(secretCode));
    }

    submit() {
        this.submitButton.click();
    }

}

module.exports = new CodePage();
