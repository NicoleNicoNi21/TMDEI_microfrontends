using System.Text;
using BCore.Models;
using Newtonsoft.Json;

namespace BCore.Services.External;

public class AccountingSystemService : IAccountingSystemService
{
    private HttpClient HttpClient;
    private IConfigurationSection AccountingSystemsEndpoints;

    public AccountingSystemService(IConfigurationSection accountingSystemEndpoints)
    {
        HttpClient = new HttpClient();
        AccountingSystemsEndpoints = accountingSystemEndpoints; 
    }

    public async Task<string> MapDocumentData(Invoice i)
    {
        var accoutingSystemUrl = AccountingSystemsEndpoints[i.AccountSystemType];
        using (var request = new HttpRequestMessage(HttpMethod.Post, accoutingSystemUrl)) 
        {
            request.Content = new StringContent(JsonConvert.SerializeObject(i), Encoding.UTF8, "application/json");
            var response = await HttpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Document could not be mapped to accounting system {i.AccountSystemType}. Status Code: {response.StatusCode}");
            }

            return await response.Content.ReadAsStringAsync();
        }
    }
}