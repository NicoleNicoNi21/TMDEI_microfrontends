using Newtonsoft.Json;

namespace OCRManager.Events.Messages;

public class PendingAnalysisMessage
{
    [JsonProperty]
    public string DocumentId;
    [JsonProperty]
    public string AccountSystemType;
    [JsonProperty]
    public string CustomerId;
    [JsonProperty]
    public string FileRelativePath;
}

// {
//     "AccountSystemType": "XPTO",
//     "Customer": {
//         "Id": "4f5e6b4f-942d-46c5-fa9b-08db496d35ad",
//     },
//     "FileRelativePath": "docs/xpto/9bea1a04-ce5b-488a-8f34-eba1c9673fe4.pdf"
// }
