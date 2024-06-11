using APIAutomation.Test.Modal;
using FluentAssertions;
using Newtonsoft.Json;
using RestSharp;
using TechTalk.SpecFlow;

namespace APIAutomation.Test.Tests.Steps
{
    [Binding]
    public class CreatePost
    {
        private readonly ScenarioContext _scenarioContext;
        private RestResponse? _response;
        private readonly RestClient _restClient;

        public CreatePost(ScenarioContext scenarioContext)
        {
            _scenarioContext = scenarioContext;
            _restClient = _scenarioContext.Get<RestClient>("RestClient");
        }

        [Given(@"I perform a POST operation for (.*) with body (.*) (.*) (.*)")]
        public async Task IPerformPostRequestToCreatePost(string endPoint, string title, string body, string userId)
        {
            var createPostRequest = new RestRequest(endPoint);
            var intUserId = int.Parse(userId);
            var postBdy = new PostsModal
            {
                Title = title,
                Body = body,
                UserId = intUserId
            };
            createPostRequest.AddBody(postBdy);

            _response = await _restClient.ExecutePostAsync(createPostRequest);
            if (_response == null)
            {
                throw new InvalidOperationException("Response is null");
            }
        }
        [When(@"The response code is (.*)")]
        public void ResponseCodeIs(int responseCode)
        {
            if (_response == null)
            {
                throw new InvalidOperationException("Response is null");
            }
            Assert.Equal(responseCode, (int)_response.StatusCode);
        }

        [Then(@"The response should contain (.*) (.*) (.*)")]
        public void ResponseContainsStatusAs(string title, string body, string userId)
        {
            if (_response == null)
            {
                throw new InvalidOperationException("No Response body");
            }

            if (string.IsNullOrEmpty(_response.Content))
            {
                throw new InvalidOperationException("The response body is null or empty");
            }

            var jsonRoot = JsonConvert.DeserializeObject<PostsModal>(_response.Content);
            if (jsonRoot == null)
            {
                throw new InvalidOperationException("Unable to deserialize");
            }

            int userIdInt = int.Parse(userId);

            jsonRoot.Title.Should().NotBeNullOrEmpty();
            jsonRoot.Title.Should().Contain(title);

            jsonRoot.Body.Should().NotBeNullOrEmpty();
            jsonRoot.Body.Should().Contain(body);

            jsonRoot.UserId.Should().Be(userIdInt);

        }
    }
}
