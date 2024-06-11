Feature: CreatePost

Verify that the API correctly handles the creation of a new post

Scenario: Create a Post
	Given I perform a POST operation for <Endpoint> with body <Title> <Body> <UserId>
	When The response code is <responseCode>
	Then The response should contain <Title> <Body> <UserId>

	Examples: 
	| Endpoint | Title             | Body         | UserId | responseCode |
	| /posts   | this is a test    | description  | 82     | 201          |
	| /posts   | another test post | testing	  | 55     | 201          |