# Test Automation with Protractor 
![CI](https://img.shields.io/github/actions/workflow/status/pmicko/test-automation-protractor/e2e.yml?label=e2e&logo=github) ![version](https://img.shields.io/github/package-json/dependency-version/pmicko/test-automation-protractor/protractor)

Example of simple E2E test with Page Object pattern written in JS using [Protractor](https://github.com/angular/protractor) and [Jasmine](https://jasmine.github.io/) frameworks.

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

To run in headless mode (without GUI), run following command:
```​
npm run test-ci
```
## Features
- Examples with and without page object pattern
- Running e2e on CI using Github Workflow
- Test report generation
