using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BCore.Models;

public class DocumentItem
{
    public Guid? Id { get; set; }
    public string? AccountingSystem { get; set; }

    public DocumentItem()
    {
    }
}