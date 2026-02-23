import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig) // Itt kell lennie a második paraméternek!
  .catch((err) => console.error(err));