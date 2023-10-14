import { enableProdMode } from '@angular/core';
import { environment } from 'projects/seoul/src/environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

import('./bootstrap')
	.catch(err => console.error(err));
