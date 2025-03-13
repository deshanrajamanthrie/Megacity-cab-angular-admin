import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  VehicleAdd!: FormGroup;

  ngOnInit(): void {
    this.iniProject();
  }

  private modalService = inject(NgbModal);



  iniProject() {
    this.VehicleAdd = this.formBuilder.group({
      id: ['', Validators.required],
      brand: [''],
      millage: [],
      fuelType: [''],
      color: [''],
      numberPlate: ['']
    });
  }

  AddVehicleModal(addVehicleModal: any) {
    this.modalService.open(addVehicleModal, { size: 'lg' });

  }

  addVehicle() {

    if (this.VehicleAdd.valid) {


      const payload = {


      }





    }



  }






}
