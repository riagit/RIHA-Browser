import { Component, ChangeDetectionStrategy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'title';

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'et']);
    let currentLang = translate.getBrowserLang() || 'et';
    if (translate.getLangs().indexOf(currentLang) === -1) {
      currentLang = 'et';
    }

    // 'en' not supported yet
    translate.use('et');
  }
}
