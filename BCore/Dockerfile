FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

COPY BCore.csproj .
RUN dotnet restore BCore.csproj

COPY . .
RUN dotnet publish -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

COPY --from=build /app ./
EXPOSE 80

ENTRYPOINT [ "dotnet", "BCore.dll" ]
