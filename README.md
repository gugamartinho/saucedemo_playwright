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

**Total: 23 automated tests** running across Chromium, Firefox, and Mobile Chrome.

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

## CI/CD

Tests run automatically on:
- Every push to `main` or `develop`
- Every Pull Request targeting `main`
- Scheduled run Monday–Friday at 08:00 UTC

The HTML report is uploaded as a GitHub Actions artifact and retained for 30 days.

## Author

David Martinho — QA Automation Engineer  
[LinkedIn](https://www.linkedin.com/in/david-martinho-6a99a492/) · [GitHub](https://github.com/gugamartinho)
```
