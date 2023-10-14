using Newtonsoft.Json;

namespace OCRManager.Models;

public class DocumentField
{
    [JsonProperty("label")]
    public string Label;

    [JsonProperty("ocr_text")]
    public string Text;

    [JsonProperty("score")]
    public double Score;

    [JsonProperty("xmin")]
    public int Xmin;

    [JsonProperty("xmax")]
    public int Xmax;

    [JsonProperty("ymin")]
    public int Ymin;

    [JsonProperty("ymax")]
    public int Ymax;

    [JsonProperty("type")]
    public string Type;
}