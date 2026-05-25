# 🚀 Incubyte (PARA BANK) Playwright Automation

A scalable end-to-end test automation framework built using Playwright, Cucumber, and TypeScript with cross-browser execution and GitHub Actions CI integration.

---

# 📌 Project Overview

This repository contains an automation framework designed for **scalable, maintainable, and readable UI testing**.

The framework follows a **Hybrid Architecture combining:**

- 🥒 **Cucumber BDD** for behavior-driven test scenarios
- 📄 **Page Object Model (POM)** for UI abstraction
- 🎭 **Playwright** for modern browser automation
- 📘 **TypeScript** for type-safe automation code
- ⚙️ **GitHub Actions CI** for continuous integration

---

# 🏗 Framework Architecture

The framework follows a **Hybrid structure combining BDD and Page Object Model**.

### Key Components

| Component | Purpose |
|----------|---------|
| **Feature Files** | Define BDD scenarios in Gherkin |
| **Step Definitions** | Implement feature steps |
| **Page Objects** | Store locators and page actions |
| **Hooks** | Setup and teardown logic |
| **Utilities** | Helper functions and common utilities |
| **Config** | Environment and browser configuration |


# 🛠 Tech Stack

- 🎭 Playwright
- 📘 TypeScript
- 🥒 Cucumber.js
- ⚙️ GitHub Actions

---

# 📥 Installation

Clone the repository:

```bash
git clone <repository-url>
cd incubyte_playwright_automation
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# ▶️ Running Tests

## 🧪 Run all tests

```bash
npx cucumber-js
```

---

## 🏷 Run tests with a specific tag

Example: Run login tests

```bash
npx cucumber-js --tags "@login"
```

---

## 🔍 Dry Run

Validate step definitions without executing tests.

```bash
npx cucumber-js --dry-run
```
---

# 🌐 Cross Browser Testing

Run tests on different browsers supported by Playwright.

### Chromium

```bash
BROWSER=chromium npx cucumber-js
```

### Firefox

```bash
BROWSER=firefox npx cucumber-js
```

### WebKit

```bash
BROWSER=webkit npx cucumber-js
```
