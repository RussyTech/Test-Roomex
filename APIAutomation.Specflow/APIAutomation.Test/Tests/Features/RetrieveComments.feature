Feature: RetrieveComments

Verify that the API correctly retrieves comments associated with a specific post.

Scenario: Retrieve Comments
    Given I perform a GET operation for <Endpoint> <postId>
	When A <responseCode> response is returned
    Then The response should include a list of comments containing email addresses

	Examples: 
	| Endpoint            | postId | responseCode |
    | posts/{id}/comments | 2      | 200          |
    | posts/{id}/comments | 4      | 200          |