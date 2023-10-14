using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BCore.Models;

public class Currency : IValidatableObject
{
    public long Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public string FullName { get; set; }

    public Currency(long id, string code, string name, string fullName) {
        this.Id = id;
        this.Code = code;
        this.Name = name;
        this.FullName = fullName;
    }

    protected Currency()
    {
    }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        throw new System.NotImplementedException();
    }
}