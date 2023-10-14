import { Injectable } from "@angular/core";
import { BlobServiceClient, HttpHeaders } from "@azure/storage-blob";
import { environment } from "projects/previewer/src/environments/environment";

// https://www.npmjs.com/package/@azure/storage-blob
@Injectable()
export class AzureStorageAccount {

    private client: BlobServiceClient;

    constructor () {
        // this.client = new BlobServiceClient(
        //     `https://${environment.storageAccountName}.blob.core.windows.net?${environment.sasToken}`,
        //     //new StorageSharedKeyCredential(environment.storageAccountName, environment.storageAccountKey)
        // );
        this.client = BlobServiceClient.fromConnectionString(environment.storageAccountConnectionString);
    }

    async getFile(containerName: string, blobName: string): Promise<any> {
        const containerClient = this.client.getContainerClient(containerName);
        const blobClient = containerClient.getBlockBlobClient(blobName);
        //blobClient.setHTTPHeaders(new BlobHTTPHeaders())

        const downloadResult = await blobClient.download();

        if (downloadResult.errorCode) throw Error(downloadResult.errorCode);
        const blobContent = await downloadResult.blobBody;
        return blobContent;
    }

    async blobToString(blob) {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
          fileReader.onloadend = (ev) => {
            resolve(ev.target.result);
          };
          fileReader.onerror = reject;
          fileReader.readAsDataURL(blob);
        });
      }
}