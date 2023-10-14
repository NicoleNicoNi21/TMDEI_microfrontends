using System.Net;
using System.Text;
using Newtonsoft.Json;
using OCRManager.Events;
using OCRManager.Events.Messages;
using OCRManager.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace BCore.Events;

public class Receiver : IReceiver
{

    public IRabbitMqClientWrapper Client;
    public INanonetsService Nanonets;
    public HttpClient HttpClient;
    public string BackendUrl;

    public Receiver(IRabbitMqClientWrapper client, INanonetsService nanonets, IConfiguration config)
    {
        Client = client;
        Nanonets = nanonets;
        HttpClient = new HttpClient();
        BackendUrl = config.GetSection("BCore")["Url"];
    }

    public void Exec()
    {
        IModel channel = Client.GetChannel();

        var queue = "PendingAnalysis";
        channel.QueueDeclare(queue, true, false, false);

        var consumer = new EventingBasicConsumer(channel);
        consumer.Received += async (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            if (message == null)
            {
                return;
            }

            PendingAnalysisMessage pam = JsonConvert.DeserializeObject<PendingAnalysisMessage>(message);
            if (pam == null)
            {
                return;
            }

            var task = Nanonets.FillInvoiceObject(pam);
            task.Wait();
            while (task.Status != TaskStatus.RanToCompletion && task.Status != TaskStatus.Faulted) { }

            if (task.Result == null)
            {
                return;
            }

            var invoice = task.Result;
            using (var request = new HttpRequestMessage(HttpMethod.Patch, $"{BackendUrl}/api/Invoice"))
            {
                request.Content = new StringContent(JsonConvert.SerializeObject(invoice), Encoding.UTF8, "application/json");
                var response = await HttpClient.SendAsync(request);

                if (response.StatusCode != HttpStatusCode.OK)
                {
                    Console.WriteLine(response.Content);
                    throw new Exception($"Backend service returned status code of {response.StatusCode}. Could not patch entity!");
                }
            }
        };

        channel.BasicConsume(queue: queue, autoAck: true, consumer: consumer);
    }

    // public static void PendingAnalysis(object? model, BasicDeliverEventArgs ea)
    // {
    //     var body = ea.Body.ToArray();
    //     var message = Encoding.UTF8.GetString(body);
    //     PendingAnalysisMessage pam = JsonConvert.DeserializeObject<PendingAnalysisMessage>(message);

    //     if (pam == null) {
    //         return;
    //     }

    //     var analysisProperties = 
    // }

    // public static void HelloWorld(object? model, BasicDeliverEventArgs ea)
    // {
    //     var body = ea.Body.ToArray();
    //     var message = Encoding.UTF8.GetString(body);
    //     Console.WriteLine($" [x] Received {message}");
    // }
}