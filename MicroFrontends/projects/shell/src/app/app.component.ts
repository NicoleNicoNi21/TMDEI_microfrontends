import { getManifest } from '@angular-architects/module-federation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomManifest, CustomRemoteConfig } from './utils/config';
import { buildRoutes } from './utils/routes';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  remotes: CustomRemoteConfig[] = [];
  private subscription: Subscription;
  receivedData: any = {};

  constructor(private router: Router) {
    this.subscription = fromEvent(window, 'aSysName').subscribe((event) => {
      this.receivedData = event;
    });
  }

  async ngOnInit(): Promise<void> {
    const manifest = getManifest<CustomManifest>();

    // Hint: Move this to an APP_INITIALIZER
    //  to avoid issues with deep linking
    const routes = buildRoutes(manifest);
    this.router.resetConfig(routes);

    this.remotes = Object.values(manifest);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
