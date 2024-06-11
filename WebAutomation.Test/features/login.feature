Feature: Test the Login Functionality

@Task1
Scenario: Attempt to log in with no credentials
    Given I am on the login page
    When I click login button
    Then I verify that error messages are displayed for both fields

@other
Scenario: Attempt to log in with invalid credentials
    Given I am on the login page
    When I login with <email> and <password>
    Then I should see an error message <errorMsg>

    Examples:
      | email             | password  | errorMsg                                                              |
      | invalidE@test.com | InvalidP  | Login failed. Please check that you have entered the correct details. |
      

@other
Scenario: Attempt to log in with only one credential provided
    Given I am on the login page
    When I login with <email> and <password>
    Then error message says <errorMsg>

    Examples:
      | email         | password             | errorMsg             |
      |               | ThisisPassword.com!  | Email is required    |
      | blah@mail.com |                      | Password is required |
