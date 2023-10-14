using System;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace OCRManager.Events;

public class RabbitMqClientWrapper : IRabbitMqClientWrapper
{
    private string HostName;
    private int? Port;
    private string UserName;
    private string Password;
    private IModel Channel;

    public RabbitMqClientWrapper(string hostname, int port, string userName, string password)
    {
        HostName = hostname;
        Port = port;
        UserName = userName;
        Password = password;

        Init();
    }

    public void Close()
    {
        throw new NotImplementedException();
    }

    public void Init()
    {
        var factory = new ConnectionFactory{ HostName = HostName, Port = Port ?? 5672, UserName = UserName, Password = Password };
        var connection = factory.CreateConnection();
        
        Channel = connection.CreateModel();
    }

    public void Publish(string queue)
    {
        throw new NotImplementedException();
    }

    public void Receive(Action<object?, BasicDeliverEventArgs> receiver, string queue)
    {
        Channel.QueueDeclare(queue);

        var consumer = new EventingBasicConsumer(Channel);
        consumer.Received += (model, ea) => receiver(model, ea);
        
        Channel.BasicConsume(queue: queue, autoAck: true, consumer: consumer);
    }

    public IModel GetChannel()
    {
        return Channel;
    }
}