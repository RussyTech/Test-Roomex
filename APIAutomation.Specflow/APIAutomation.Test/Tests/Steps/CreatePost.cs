using APIAutomation.Test.Modal;
using FluentAssertions;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechTalk.SpecFlow;

namespace APIAutomation.Test.Tests.Steps
{
    [Binding]
    public class CreatePost
    {
        private readonly ScenarioContext _scenarioContext;
        private RestResponse _response;
        private RestClient _restClient;

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

            PostsModal postBdy = new PostsModal();
            postBdy.Title = title;
            postBdy.Body = body;
            postBdy.UserId = intUserId;
            createPostRequest.AddBody(postBdy);

            _response = await _restClient.ExecutePostAsync(createPostRequest);
        }
        [When(@"The response code is (.*)")]
        public void ResponseCodeIs(int responseCode)
        {
            Assert.Equal(responseCode, (int)_response.StatusCode);
        }

        [Then(@"The response should contain (.*) (.*) (.*)")]
        public void ResponseContainsStatusAs(string title, string body, string userId)
        {
            int userIdInt = int.Parse(userId);
            var JsonRoot = JsonConvert.DeserializeObject<PostsModal>(_response.Content);
            var confirmTitleResponse = JsonRoot.Title;
            var confirmBodyResponse = JsonRoot.Body;
            var confirmUserIdResponse = JsonRoot.UserId;
            JsonRoot.Should().NotBeNull();
            confirmTitleResponse.Should().Contain(title);
            confirmBodyResponse.Should().Contain(body);
            confirmUserIdResponse.Should().Be(userIdInt);

        }
    }
}
