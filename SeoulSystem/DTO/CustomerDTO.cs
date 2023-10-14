using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeoulSystem.DTO;

public class CustomerDTO
{
    public Guid Id { get; set; }

    public string? Iban { get; set; }

    public string? Name { get; set; }

    public string? Code { get; set; }

    public CustomerDTO(Guid id, string iban, string name, string code) {
        this.Id = id;
        this.Iban = iban;
        this.Name = name;
        this.Code = code;
    }

    protected CustomerDTO()
    {
    }
    
}