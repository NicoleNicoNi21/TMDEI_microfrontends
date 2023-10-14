// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendUrl: "http://localhost:4999/api",
  storageAccountConnectionString: "SharedAccessSignature=sv=2021-10-04&ss=btqf&srt=sco&spr=https%2Chttp&st=2023-07-26T20%3A56%3A31Z&se=2025-12-27T21%3A56%3A00Z&sp=rwdxftlacup&sig=JkfoMhDO4pA5WvNQ5xNxRcrbaNjeYrVr%2F%2FDx5femm44%3D&api-version=2021-10-04;BlobEndpoint=http://localhost:19238/devstoreaccount1;FileEndpoint=undefined://devstoreaccount1.file.core.windows.net;QueueEndpoint=undefined://devstoreaccount1.queue.core.windows.net;TableEndpoint=undefined://devstoreaccount1.table.core.windows.net;",
  documentsContainerName: "docs",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
