Feature: Test the password reset Functionality

@Task2
Scenario: Attempt to rest password
    Given I am on the password reset page
    When I insert email <email>
    When I click reset password button
    Then an error message is shown <errorMsg>

    Examples:
    | email                | errorMsg                    |
    | bob@roomex.com       | Email address does not exist| 

@other
Scenario: Confirm error for invalid email format
    Given I am on the password reset page
    When I insert email <email>
    When I click reset password button
    Then I see an error <errorMsg>

    Examples:
    | email                | errorMsg                    |
    | invalidemailfor      |  Email format is invalid    | 
