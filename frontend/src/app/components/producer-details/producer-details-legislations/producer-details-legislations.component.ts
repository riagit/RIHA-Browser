import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProducerEditLegislationsComponent } from '../../producer-edit/producer-edit-legislations/producer-edit-legislations.component';
import { System } from '../../../models/system';

@Component({
  selector: 'app-producer-details-legislations',
  templateUrl: './producer-details-legislations.component.html',
  styleUrls: ['./producer-details-legislations.component.scss']
})
export class ProducerDetailsLegislationsComponent implements OnInit {

  @Input() system: System;

  openLegislationsEdit(content) {
    const modalRef = this.modalService.open(ProducerEditLegislationsComponent);
    this.system.details.legislations = this.system.details.legislations || [];
    modalRef.componentInstance.system = this.system;
    modalRef.componentInstance.legislations = [].concat(this.system.details.legislations);
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

}
