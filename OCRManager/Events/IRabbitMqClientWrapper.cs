using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace OCRManager.Events;

public interface IRabbitMqClientWrapper
{
    void Init();
    void Receive(Action<object?, BasicDeliverEventArgs> receiver, string queue);
    void Publish(string queue);
    void Close();
    IModel GetChannel();
}