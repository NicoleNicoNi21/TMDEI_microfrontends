using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BCore.Models;

public class Customer : IValidatableObject
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    public string? Iban { get; set; }

    public string? Name { get; set; }

    public string? Code { get; set; }

    public Customer(Guid id, string iban, string name, string code) {
        this.Id = id;
        this.Iban = iban;
        this.Name = name;
        this.Code = code;
    }

    protected Customer()
    {
    }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        return new List<ValidationResult>();
    }
}