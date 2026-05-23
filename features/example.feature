Feature: Example workflow

  Scenario: Open the application home page
    Given I navigate to the application
    Then the page title should contain "Playwright"
