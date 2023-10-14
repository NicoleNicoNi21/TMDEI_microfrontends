using BCore.Models;

namespace BCore.Infrastructure.Persistence;

public class PopulateDatabase : IPopulateDatabase
{
    private readonly CustomerRepository _customerRepository;
    private readonly InvoiceRepository _invoiceRepository;
    private static readonly string[] guids = {
        "d680ce96-35bf-4ce7-9eb4-d8e2d5e2189d", //seoul
        "ca2e9ac0-15c8-46f5-ad5b-296fd2d2a36f", //seoul
        "ed4efec1-7cdb-4351-924f-d267165cf1b3", //seoul
        "66ff2b4d-c093-4dac-b056-c485ec9bf52f", //seoul
        "d109c99b-ecde-4e3e-a4dd-4e85777d55bf", //seoul
        "1c20e946-f81b-4e49-8931-678cab28f6fe", //seoul
        "2d23c159-9724-492d-a6fa-277bc544b754", //tokyo
        "1821a9af-a688-4878-b421-d93fed4cd097", //tokyo
        "2e2e91a0-c12a-4829-9dcb-f7da6b3e3809", //tokyo
    };

    private static readonly string[] accountingSystems = { "tokyo", "seoul" };


    public PopulateDatabase(CustomerRepository customerRepository, InvoiceRepository invoiceRepository)
    {
        _customerRepository = customerRepository;
        _invoiceRepository = invoiceRepository;
    }

    public async void Exec()
    {
        try
        {
            Customer c = new Customer(Guid.Parse("4f5e6b4f-942d-46c5-fa9b-08db496d35ad"), "LU2800194006447500003", "Mike Wazowski", "1");
            await _customerRepository.Create(c);

            foreach (string g in guids)
            {
                var accountingSys = guids.ToList().FindIndex(a => a == g) > 5 ? accountingSystems[0] : accountingSystems[1] ;
                Invoice i = new Invoice();
                i.DocumentId = Guid.Parse(g);
                i.Customer = c;
                i.FileRelativePath = $"{accountingSys}/{g}.pdf";
                i.AccountSystemType = accountingSys;

                await _invoiceRepository.Create(i);
            }
        }
        catch { }
    }
}