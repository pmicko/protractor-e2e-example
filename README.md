# Test Automation with Protractor  ![CI](https://img.shields.io/github/workflow/status/pmicko/test-automation-protractor/E2E?label=e2e&logo=github) ![version](https://img.shields.io/github/package-json/dependency-version/pmicko/test-automation-protractor/protractor) ![CodeFactor](https://img.shields.io/codefactor/grade/github/pmicko/test-automation-protractor/master?color=%2B)
This represents example of basic E2E test written in JS using [Protractor](https://github.com/angular/protractor) and [Jasmine](https://jasmine.github.io/) frameworks.

## Setup

### preconditions
- Protractor runs in [NodeJS](https://nodejs.org/), so you need to have it installed on your system as well.
- Chrome browser (test will run in Chrome  by default)

### installation
In terminal, run following command:
```
npm install
```
This will:
- install test packages
- download drivers for browsers

## Test Execution 
In terminal, run following command:
```​
npm run test
```
## Features
- Test report generation
- Running e2e on CI using GH Workflow

## Notes
- To keep spec example as simple as possible, page object pattern is not used
