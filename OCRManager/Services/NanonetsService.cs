using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Azure.Storage.Blobs;
using Newtonsoft.Json;
using OCRManager.Events.Messages;
using OCRManager.Models;

namespace OCRManager.Services;

public class NanonetsService : INanonetsService
{
    private HttpClient HttpClient;
    private BlobServiceClient BlobServiceClient;
    private BlobContainerClient BlobContainerClient;
    private string Url;
    private string ApiKey;
    public NanonetsService(string url, string apiKey, string connectionString, string containerName)
    {
        HttpClient = new HttpClient();
        BlobServiceClient = new BlobServiceClient(connectionString);
        BlobContainerClient = BlobServiceClient.GetBlobContainerClient(containerName);
        Url = url;
        ApiKey = apiKey;
    }

    public async Task<IEnumerable<DocumentField>?> AnalyseDocument(PendingAnalysisMessage msg)
    {
        // DateTime d1 = DateTime.Now;
        // DateTime d2 = DateTime.Now.AddDays(-100);
        // var old = DateTime.Parse("1970-01-01");

        var getAllDocumentPredictions = new HttpRequestMessage(HttpMethod.Get, $"{Url}/Inferences/Model/fad8b337-ee1e-4d3e-816f-4ac1c0c09f9a/ImageLevelInferences");
        getAllDocumentPredictions.Headers.Authorization = new AuthenticationHeaderValue(
                "Basic", Convert.ToBase64String(Encoding.Default.GetBytes(ApiKey))
        );
        var documentPredictionsResponse = await HttpClient.SendAsync(getAllDocumentPredictions);

        if (documentPredictionsResponse.StatusCode != HttpStatusCode.OK)
        {
            throw new Exception($"External service returned status code of {documentPredictionsResponse.StatusCode}!");
        }
        var jsonStringDocuments = await documentPredictionsResponse.Content.ReadAsStringAsync();
        dynamic jsonDynamicObjDocuments = JsonConvert.DeserializeObject<dynamic>(jsonStringDocuments)!;

        dynamic docObj = null;
        foreach (var doc in jsonDynamicObjDocuments["unmoderated_images"])
        {
            if ($"{msg.DocumentId}.pdf" == ((dynamic)doc)["original_file_name"].Value)
            {
                docObj = (dynamic)doc;
                break;
            }
        }

        if (docObj != null)
        {
            return JsonConvert.DeserializeObject<List<DocumentField>>(JsonConvert.SerializeObject(((dynamic)docObj)["predicted_boxes"]));
        }

        // $"{Url}/OCR/Model/fad8b337-ee1e-4d3e-816f-4ac1c0c09f9a/LabelUrls/?async=false"
        using (var request = new HttpRequestMessage(HttpMethod.Post, $"{Url}/OCR/Model/fad8b337-ee1e-4d3e-816f-4ac1c0c09f9a/LabelUrls/?async=false"))
        {
            //var fullfilePath = $"{msg.FileRelativePath.Replace("/", "")}/{msg.DocumentId}.pdf";
            var blobClient = BlobContainerClient.GetBlobClient(msg.FileRelativePath);

            byte[] fileBytes = new byte[] { };
            using (var ms = new MemoryStream())
            {
                try
                {
                    await blobClient.DownloadToAsync(ms);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
                fileBytes = ms.ToArray();
            }

            var byteContent = new ByteArrayContent(fileBytes);
            //byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");

            var multipartFormContent = new MultipartFormDataContent();
            multipartFormContent.Add(byteContent, name: "file", fileName: $"{msg.DocumentId}.pdf");

            request.Headers.Authorization = new AuthenticationHeaderValue(
                "Basic", Convert.ToBase64String(Encoding.Default.GetBytes(ApiKey))
            );
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("Multipart/form-data"));
            request.Content = multipartFormContent;

            var response = await HttpClient.SendAsync(request);
            if (response.StatusCode != HttpStatusCode.OK)
            {
                throw new Exception($"External service returned status code of {response.StatusCode}!");
            }

            var jsonString = await response.Content.ReadAsStringAsync();
            var jsonDynamicObj = JsonConvert.DeserializeObject<dynamic>(jsonString)!;
            List<DocumentField>? documentFields = JsonConvert.DeserializeObject<List<DocumentField>>(JsonConvert.SerializeObject(jsonDynamicObj?.result[0].prediction));

            return documentFields;
        }
    }

    public async Task<Invoice> FillInvoiceObject(PendingAnalysisMessage msg)
    {
        var documentFields = await AnalyseDocument(msg);

        Invoice invoice = new Invoice();
        invoice.DocumentId = msg.DocumentId;

        var invoiceNumber = documentFields.Where(field => field.Label == "invoice_number").Single();
        if (invoiceNumber != null) { invoice.Number = invoiceNumber.Text; }
        
        var currency = documentFields.Where(field => field.Label == "currency").Single();
        if (currency != null) { invoice.Currency = currency.Text; }

        // var amount = documentFields.Where(field => field.Label == "invoice_amount").Single();
        // if (amount != null) { invoice.TotalAmount = Double.Parse(amount.Text.Replace("€", "").Trim().Replace(",", ".")); }

        return invoice;
    }
}