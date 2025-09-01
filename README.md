# Inferyx Automation Framework

A robust Playwright automation framework with Page Object Model pattern for testing the Inferyx platform.

## 🏗️ Project Structure

├── base/ # Base test classes
│ └── BaseTest.js # Common test setup and authentication
├── pages/ # Page Object Model classes (locators only)
│ ├── Platform/
│ │ └── Login/
│ │ └── LoginPage.js
│ ├── Administration/
│ │ └── Organization/
│ │ └── OrganizationPage.js
│ └── DataCatalog/
├── tests/ # Test cases organized by module hierarchy
│ ├── Platform/
│ │ ├── Login/
│ │ └── Application/
│ ├── Administration/
│ │ ├── Organization/
│ │ │ ├── TC--12.11.423.spec.js
│ │ │ ├── TC--12.11.424.spec.js
│ │ │ ├── TC--12.11.425.spec.js
│ │ │ └── TC--12.11.426.spec.js
│ │ ├── Account/
│ │ └── Activity/
│ └── DataCatalog/
├── utils/ # Utility functions
│ └── saveDownload.js
├── playwright.config.js # Playwright configuration
├── package.json # Dependencies and scripts
└── .env # Environment variables template

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   cd demo1
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Install Playwright browsers:
   \`\`\`bash
   npx playwright install
   \`\`\`

4. Set up environment variables:

# Run all tests

npm test

# Run tests in headed mode

npm run test:headed

# Run specific module tests

npm run test:organization
npm run test:administration
npm run test:platform

# Run tests by pattern/grep

 npm run test:module --grep "TC-SAM-0.11.1.431"
 
### Module-wise Execution

\`\`\`bash

# Run Administration module tests

npx playwright test tests/Administration/

# Run Organization submodule tests

npx playwright test tests/Administration/Organization/

# Run specific test case

npx playwright test --grep "TC--12.11.423"
\`\`\`

## 📊 Reporting

### View HTML Report

\`\`\`bash
npx playwright show-report
\`\`\`

## 🤝 Contributing

1. Follow the existing folder structure
2. Use meaningful test case IDs
3. Add proper Allure annotations
4. Keep page objects with locators only
5. Write comprehensive test descriptions

#