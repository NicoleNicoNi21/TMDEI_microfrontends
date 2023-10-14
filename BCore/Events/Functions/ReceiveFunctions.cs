using System.Text;
using BCore.Models;
using Newtonsoft.Json;
using RabbitMQ.Client.Events;

namespace BCore.Events.Functions;

public static class ReceiveFunctions {

    public static void AnalysisFinished(object? model, BasicDeliverEventArgs ea)
    {
        throw new NotImplementedException();
    }

    public static void HelloWorld(object? model, BasicDeliverEventArgs ea)
    {
        var body = ea.Body.ToArray();
        var message = Encoding.UTF8.GetString(body);
        Console.WriteLine($" [x] Received {message}");
    }
}