import { Component, OnInit, Input, trigger, transition, style, animate } from '@angular/core';
import { System } from '../../../models/system';
import { SystemsService } from '../../../services/systems.service';
import { WindowRefService } from '../../../services/window-ref.service';
import { Router } from '@angular/router';
import { G } from '../../../globals/globals';

@Component({
  selector: 'app-producer-edit-general',
  templateUrl: './producer-edit-general.component.html',
  styleUrls: ['./producer-edit-general.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class ProducerEditGeneralComponent implements OnInit {

  @Input() system: System;
  showAlert: boolean;
  alertConf: any;
  globals: any = G;

  showValidationError() {
    this.alertConf = {
      type: 'danger',
      heading: 'Viga',
      text: 'Infosüsteemi valideerimise viga'
    };
    this.showAlert = true;
    this.winRef.nativeWindow.scrollTo(0,0);
    setTimeout(() => {this.showAlert = false}, 5000);
  }

  onSubmit(f) :void {
    if (f.valid) {
      this.systemsService.updateSystem(this.systemsService.prepareSystemForSending(this.system)).then(response => {
        this.router.navigate(['/Kirjelda/Vaata/', response.json().id]);
      }, error => {
        this.system = this.systemsService.prepareSystemForDisplay(this.system);
        //show error on server side validation failure
        let responseError = error.json();
        let isValidationError = false;
        responseError.forEach(obj => {
          if (obj.level === 'error' && obj.domain === 'validation'){
            isValidationError = true;
          }
        });
        if (isValidationError){
          this.showValidationError();
        }
      });
    }
  }

  changeSystemStatus(status) {
    this.system.setStatus(status);
    if (status != G.system_status.IN_USE){
      this.system.details.meta.system_status.timestamp = null;
    }
    return false;
  }

  changeInDevelopmentStatus(inDevelopment){
    this.system.setInDevelopment(inDevelopment);
    return false;
  }

  constructor(private systemsService: SystemsService,
              private router: Router,
              private winRef: WindowRefService) {
    this.showAlert = false;
    this.alertConf = {};
  }

  ngOnInit() {
  }

}
