import { loadManifest } from '@angular-architects/module-federation';

//https://www.angulararchitects.io/en/blog/dynamic-module-federation-with-angular/
loadManifest('/assets/mf.manifest.json', false) //loadManifest function provides a second parameter called skipRemoteEntries. Set it to true to prevent loading the entry points
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
