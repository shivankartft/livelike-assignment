
## Cloning the repo

To clone the repo go to the desired location where you want to clone the repo

Then run the following command

```bash
  git clone git@github.com:shivankartft/livelike-assignment.git
```
After cloning the repo open the repo in any ide preferrably vs code
Run the following command to install all the required dependencies assuming that node and yarn is pre-installed in the system

```bash
  yarn install
```

To run the test use the following command
```bash
  yarn run test
```

To run the tests in headed mode please change to value of HEADLESS_MODE variable in .env file to true byh default it is set to run the tests in headless mode.

Once the test execution is completed you can generate allure-reports on your local system using the following command
```bash
  yarn run generate:allure
  yarn run open:allure
```
If any commit is merged to dev branch then github action will automatically trigger the tests on our automation repo and will send an email with the report link.
