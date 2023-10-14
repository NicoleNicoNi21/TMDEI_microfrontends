using RabbitMQ.Client.Events;

namespace BCore.Events;

public interface IRabbitMqClientWrapper
{
    void Init();
    void Receive(Action<object?, BasicDeliverEventArgs> receiver, string queue);
    void Publish(string queue, string msg);
    void Close();
}