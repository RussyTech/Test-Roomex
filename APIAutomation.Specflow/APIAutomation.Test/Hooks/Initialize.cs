using APIAutomation.Test.Drivers;
using TechTalk.SpecFlow;

namespace APIAutomation.Test.Hooks
{
    [Binding]
    public class Initialize
    {
        private readonly ScenarioContext _scenarioContext;
        //private RestResponse _restResponse;

        public Initialize(ScenarioContext scenarioContext) => _scenarioContext = scenarioContext;

        [BeforeScenario()]
        public void InitializeDriver()
        {

            Driver driver = new Driver(_scenarioContext);
            _scenarioContext.Set(driver, "Driver");
        }
    }
}
