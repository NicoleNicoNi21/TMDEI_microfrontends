using Autofac;
using Autofac.Core;
using Autofac.Extensions.DependencyInjection;
using BCore.Events;
using BCore.Events.Functions;
using BCore.Infrastructure;
using BCore.Infrastructure.Persistence;
using BCore.Services;
using BCore.Services.External;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());
builder.Host.ConfigureContainer<ContainerBuilder>(af =>
{
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
        .OnActivating(e =>
        {
            e.Instance.Receive(ReceiveFunctions.HelloWorld, "hello");
        })
        .SingleInstance()
        .AutoActivate();
    
    af.RegisterType<AccountingSystemService>()
        .As<IAccountingSystemService>()
        .WithParameter("accountingSystemEndpoints", builder.Configuration.GetSection("AccountingSystemsEndpoints"));
});

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IInvoiceRepository, InvoiceRepository>();

builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IInvoiceService, InvoiceService>();

builder.Services.AddDbContext<BCoreContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer"));
});

builder.Services.AddScoped<CustomerRepository>();
builder.Services.AddScoped<InvoiceRepository>();

builder.Services.AddScoped<IPopulateDatabase, PopulateDatabase>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_allowAll",
        policy =>
        {
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            policy.AllowAnyOrigin();
        }
    );
});

var app = builder.Build();

if (Environment.GetEnvironmentVariable("AUTO_MIGRATE") == "true")
{
    app.Services.GetService<BCoreContext>()?.Database.Migrate();
}

if (Environment.GetEnvironmentVariable("POPULATE_DATABASE") == "true")
{
    var populateService = app.Services.GetService(typeof(IPopulateDatabase)) as IPopulateDatabase;
    populateService?.Exec();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseRouting();

app.UseCors("_allowAll");

app.Run();
