Feature: User Registration

  Background: Create a new ParaBank account
    Given I am on the Customer Login page
    When I click on the "Register" link
    Then Signing up is easy! section should be visible
    When I enter details in the form 
    |First Name|Last Name|Address    |City    |State|Zip Code|Phone         |SSN        |Username   |Password  |Confirm   |
    |playwright|Test  |123 Main St|New York|NY   |20011   |+1 133738888664|123-55-7789|playwright |password@23|password@23|
    And I click on Register button
    Then Validate that user should be logged in with mesage "Your account was created successfully. You are now logged in."
    When I click on "Log Out" link


