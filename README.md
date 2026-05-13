# Playwright Automation Portfolio

QA Automation project built with **Playwright** and **TypeScript**, demonstrating modern test automation practices applied to the [SauceDemo](https://www.saucedemo.com) e-commerce application.

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe scripting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |

## Project Structure

```
playwright-automation-portfolio/
├── pages/                  # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CartPage.ts
├── tests/
│   ├── e2e/                # Test specs
│   │   ├── login.spec.ts
│   │   ├── inventory.spec.ts
│   │   └── cart.spec.ts
│   └── fixtures/           # Shared fixtures and constants
│       └── index.ts
├── .github/workflows/      # CI/CD pipeline
│   └── playwright.yml
├── playwright.config.ts    # Playwright configuration
└── tsconfig.json           # TypeScript configuration
```

## Design Patterns

- **Page Object Model (POM)** — UI interactions encapsulated per page, keeping tests clean and maintainable
- **Custom Fixtures** — shared page instances injected into tests via Playwright's fixture system
- **Data separation** — test credentials and constants isolated in fixtures

## Test Coverage

| Area | Tests |
|------|-------|
| Login | Valid login, locked user, invalid credentials, empty fields |
| Inventory | Product count, add to cart, sorting (A-Z, Z-A, price) |
| Cart | Empty cart, add items, remove items, proceed to checkout |
| Checkout | Full E2E flow, form validation, cancel, multiple items |

**Total: 24 automated tests** running across Chromium

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/gugamartinho/saucedemo_playwright.git
cd saucedemo_playwright
npm install
npx playwright install
```

### Environment variables

Create a `.env` file at the project root or copy `.env.example`.

```bash
cp .env.example .env
```

Then update the credentials if needed:

```env
VALID_USERNAME=standard_user
VALID_PASSWORD=secret_sauce
```

The project now loads `VALID_USERNAME` and `VALID_PASSWORD` from `.env`.

### Running Tests

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:headed

# Open interactive UI mode
npm run test:ui

# View HTML report
npm run report
```

### Running specific tests

```bash
# Single spec file
npx playwright test login.spec.ts

# Single test by name
npx playwright test -g "should login successfully"

# Single browser only
npx playwright test --project=chromium
```

### Running with Docker

1. Build the Docker image
To create a reproducible environment for running Playwright tests, you can build the Docker image using the provided Dockerfile:
```bash
docker build -t playwright-saucedemo-tests .
```
This command packages your project, installs dependencies, and prepares the Playwright browsers inside a containerized environment.

2. Run Playwright tests inside Docker
After building the image, you can execute the full Playwright test suite inside the container:
```bash
docker run --rm playwright-saucedemo-tests
```
This runs the tests using the environment defined in the Docker image, ensuring the same setup locally and in CI.

3. Accessing the Playwright report
When running tests inside Docker, the HTML report is generated inside the container.
To make it available on your machine, mount the report directory:
```bash
docker run --rm -v ${PWD}/playwright-report:/app/playwright-report playwright-saucedemo-tests
```
After the container finishes, you can open the report locally:
```bash
npx playwright show-report
```
Or by opening the file directly:
```bash
playwright-report/index.html
```