using BCore.Models;

namespace BCore.Services.External;

public interface IAccountingSystemService
{
    Task<string> MapDocumentData(Invoice i);
}