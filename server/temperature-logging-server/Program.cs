using Microsoft.Extensions.Options;
using MongoDB.Driver;
using temperature_logging_server.Models;
using temperature_logging_server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<LogEntriesDatabaseSettings>(builder.Configuration.GetSection(nameof(LogEntriesDatabaseSettings)));
builder.Services.AddSingleton<ILogEntriesDatabaseSettings>(sp => sp.GetRequiredService<IOptions<LogEntriesDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("LogEntriesDatabaseSettings:ConnectionString")));
builder.Services.AddScoped<ILogEntryService, LogEntryService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(
  options => options.WithOrigins("*").AllowAnyMethod().AllowAnyHeader()
      );

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
