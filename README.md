# spikerz_assessment

This project automates Google login using **Playwright** Using **Playwright** framework with the **Page Object Model (POM)** approach.  
- **Handles Google login in the same browser context** (no popup issues)  
- **Includes positive & negative test cases**  
- **Uses reusable authentication logic**  
- **Stores login sessions to avoid repeated sign-ins**  

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/idorenyinankoh/spikerz_assessment
   cd spikerz-assessment
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright Browsers**:
   ```bash
   npx playwright install
   ```

4. **Set Up Environment Variables**:
   Create a `.env` file in the root of the project with the following content:
   ```
   TEST_URL=https://{{server_username}}:{{server_password}}@your-test-url.com
   G_EMAIL=your-email@gmail.com
   G_PASSWORD=your-password
   ```

## Project Structure

```
spikerz-tests/
├── pages/
│   ├── ClientAppPage.js  # Page object for the client app
├── tests/
│   └── youtubeGoogleSignIn.spec.js         # Test file containing the test cases
├── .env                         # Default environment variables
├── playwright.config.js         # Playwright configuration
├── package.json                 # Project dependencies
└── README.md                    # Project documentation
```

## How the Script Works

The test script follows these steps:

1. **Page Navigation**: The test navigates to the Spikerz social connect page using HTTP authentication.
2. **YouTube Integration**:
   - Locates and clicks the YouTube icon on the social connect page.
   - Clicks the login button, opening a popup for Google authentication.
3. **Authentication**:
   - Fills in the Google email and clicks Next.
   - Handles potential reCAPTCHA challenges.
   - Fills in the Google password and clicks Next.
4. **Verification**:
   - Confirms that the YouTube account is successfully connected.
   - Checks for the presence of specific elements on the page.

## Running the Tests

To execute the tests:

- **Run All Tests**:
  ```bash
  npx playwright test
  ```

- **Run with UI Mode**:
  ```bash
  npx playwright test --ui
  ```

- **Run a Specific Test File**:
  ```bash
  npx playwright test tests/youtubeGoogleSignIn.spec.js
  ```

- **Run in Debug Mode**:
  ```bash
  npx playwright test --debug
  ```

## Test Reports

Playwright generates HTML reports after test runs. To view the latest report:
```bash
npx playwright show-report
```

## Troubleshooting

### Common Issues

- **Authentication Failures**:
  - Ensure credentials in `.env` are correct.
  - Check if Google requires additional verification.

- **Authentication Challenges**:
  - Google may use various detection methods to detect robot activities.

### Debugging Tips

- Use the `--debug` flag to run tests in debug mode.
- Add `await page.pause()` at specific points in your test for interactive debugging.
- Increase timeouts for flaky operations:
  ```javascript
  await page.locator('selector').click({ timeout: 30000 });
  ```
