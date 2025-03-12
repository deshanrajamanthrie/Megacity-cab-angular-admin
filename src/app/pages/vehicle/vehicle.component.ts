import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent implements OnInit {


  ngOnInit(): void {

  }

  private modalService = inject(NgbModal);



  AddVehicleModal(addVehicleModal: any) {
    this.modalService.open(addVehicleModal, { size: 'lg' });


  }






}
