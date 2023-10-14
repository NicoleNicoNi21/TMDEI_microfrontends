using Autofac;
using Autofac.Core;
using Autofac.Extensions.DependencyInjection;
using BCore.Events;
using OCRManager.Events;
using OCRManager.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(af => {
    var nanonetsConfig = builder.Configuration.GetSection("Nanonets");
    af.RegisterType<NanonetsService>()
        .As<INanonetsService>()
        .WithParameters(
            new List<Parameter>{
                new NamedParameter("url", nanonetsConfig["Url"]),
                new NamedParameter("apiKey", nanonetsConfig["ApiKey"]),
                new NamedParameter("connectionString", builder.Configuration.GetConnectionString("StorageAccount")),
                new NamedParameter("containerName", "docs"),
            }
        )
        .SingleInstance()
        .AutoActivate();

    var mbConfig = builder.Configuration.GetSection("MessageBroker:RabbitMq");
    af.RegisterType<RabbitMqClientWrapper>()
        .As<IRabbitMqClientWrapper>()
        .WithParameters(
            new List<Parameter>{
                new NamedParameter("hostname", mbConfig["HostName"]),
                new NamedParameter("port", mbConfig["Port"]),
                new NamedParameter("userName", mbConfig["UserName"]),
                new NamedParameter("password", mbConfig["Password"])
            }
        )
        .SingleInstance()
        .AutoActivate();
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IReceiver, Receiver>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

IReceiver? receiverService = app.Services.GetService(typeof(IReceiver)) as IReceiver;
if (receiverService != null)
{
    receiverService.Exec();
}

app.Run();
