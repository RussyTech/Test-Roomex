using Microsoft.Extensions.Configuration;
using RestSharp;
using TechTalk.SpecFlow;

namespace APIAutomation.Test.Drivers
{
    public class Driver
    {
        public Driver(ScenarioContext scenarioContext)
        {

            var configuration = new ConfigurationBuilder()
               .AddJsonFile("appsettings.json", false)
               .Build();

            BaseUrl = configuration["ApiConfiguration:BaseUrl"];
            if (string.IsNullOrWhiteSpace(BaseUrl))
            {
                throw new InvalidOperationException("BaseUrl is null or empty in the configuration file");
            }
            var restClientOptions = new RestClientOptions
            {
                BaseUrl = new Uri(BaseUrl),
                RemoteCertificateValidationCallback = (sender, certificate, chain, errors) => true
            };
            var restClient = new RestClient(restClientOptions);
            scenarioContext.Add("RestClient", restClient);
        }
        private string BaseUrl { get; }
    }
}
