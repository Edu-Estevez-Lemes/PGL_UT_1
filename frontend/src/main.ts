import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// 👇 Esta línea permite usar la cámara y el selector de archivos en la web
defineCustomElements(window);
