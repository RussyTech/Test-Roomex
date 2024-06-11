using APIAutomation.Test.Modal;
using FluentAssertions;
using Newtonsoft.Json;
using RestSharp;
using TechTalk.SpecFlow;

namespace APIAutomation.Test.Tests.Steps
{
    [Binding]
    public class RetrieveComments
    {
        private readonly ScenarioContext _scenarioContext;
        private RestResponse _response;
        private RestClient _restClient;

        public RetrieveComments(ScenarioContext scenarioContext)
        {
            _scenarioContext = scenarioContext;
            _restClient = _scenarioContext.Get<RestClient>("RestClient");
        }

        [Given(@"I perform a GET operation for (.*) (.*)")]
        public async Task PerformGetOperation(string endpoint, string postId)
        {
            var request = new RestRequest(endpoint, Method.Get);
            request.AddUrlSegment("id", postId);
            _response = await _restClient.ExecuteAsync(request);
        }

        [When(@"A (.*) response is returned")]
        public void ThenResponseIsReturned(int responseCode)
        {
            Assert.Equal(responseCode, (int)_response.StatusCode);
        }

        [Then(@"The response should include a list of comments containing email addresses")]
        public void TheResponseShouldContainemailAddresses()
        {
            var JsonRoot = JsonConvert.DeserializeObject<List<CommentModal>>(_response.Content);
            foreach (var comment in JsonRoot)
            {
                comment.Email.Should().NotBeNullOrEmpty();
                comment.Email.Should().Contain("@");
            }
        }
    }
}
