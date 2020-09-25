const fs = require('fs');
const fse = require('fs-extra');

exports.config = {

    directConnect: true,
    specs: ['./specs/quotes.spec.js'],
    jasmineNodeOpts: {print: () => {}}, // suppress default "dot" reporter
    baseUrl: 'https://qa-homework.herokuapp.com',

    onPrepare: function () {
        browser.driver.manage().window().maximize();

        // for non-angular app - prevents protractor to wait for angular to be present when loading the test page
        browser.waitForAngularEnabled(false);

        /**
         * Create custom date string for reporters to have always unique file/dir names
         */
        const currentDate = new Date();
		const convert = input => (input < 10) ? `0${input}` : input;

		let second = convert(currentDate.getSeconds());
        let minute = convert(currentDate.getMinutes());
        let hour = convert(currentDate.getHours());
        let day = convert(currentDate.getDate());
        let month = convert(currentDate.getMonth() + 1);
        let year = convert(currentDate.getFullYear());
        const dateTimeString = `${year}-${month}-${day}-${hour}-${minute}-${second}`;

        /**
         * Apply defaults to custom global parameters
         */
        browser.params.actualReportDir = `./reports/Chrome_${dateTimeString}/`;

		/**
         * Create report structures
         */
        const reportDir = './reports/';
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir);
        }
        fs.mkdirSync(browser.params.actualReportDir);

        /**
         * Setup console reporter
         */
        const consoleReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(
            new consoleReporter({
                spec: {
                    displayDuration: true,
                    displayStacktrace: false,
                },
                summary: {
                    displayDuration: true,
                    displayStacktrace: false,
                },
            })
        );

        /**
         * Setup XML reporter (mainly as a source for html report)
         */
        const jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new jasmineReporters.JUnitXmlReporter({
                savePath: browser.params.actualReportDir,
                filePrefix: 'xmlReport',
                consolidateAll: true,
            })
        )

        /**
         * Screenshots (and app error logs) for failed specs
         */
        fse.emptyDir(browser.params.actualReportDir + 'screenshots/', err => {
            if (err) console.error(err);
        });
        jasmine.getEnv().addReporter({
            specDone: result => {
                if (result.status === 'passed') {
                    browser.getCapabilities().then(caps => {
                        const browserName = caps.get('browserName');
                        const screenshotFileName = `${browserName}-${result.fullName.replace(/[/\\?%*:|"<>.]/g, ' ')}.png`;
                        browser.takeScreenshot().then(png => {
                            const stream = fs.createWriteStream(browser.params.actualReportDir + `screenshots/${screenshotFileName}`);
                            stream.write(Buffer.from(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            },
        });
    },
    onComplete: () => {
        /**
         * Generate html report (from already generated xml report)
         */
        const HTMLReport = require('protractor-html-reporter');
        if (fs.existsSync(`${browser.params.actualReportDir}xmlReport.xml`)) {
            let browserName, browserVersion;
            let capsPromise = browser.getCapabilities();
            capsPromise.then(caps => {
                browserName = caps.get('browserName');
                browserVersion = caps.get('version');
				new HTMLReport().from(`${browser.params.actualReportDir}xmlReport.xml`, {
                    reportTitle: 'Test Report',
                    outputPath: browser.params.actualReportDir,
                    screenshotPath: './screenshots',
                    testBrowser: browserName,
                    browserVersion: browserVersion,
                    modifiedSuiteName: false,
                    screenshotsOnlyOnFailure: false,
                });
            });
        }
    },
};
