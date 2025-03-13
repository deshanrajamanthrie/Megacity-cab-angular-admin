import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.scss'
})
export class DriverComponent {

  driverAdd!: FormGroup;
  private modalService = inject(NgbModal);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.iniProject();
  }
  iniProject() {
    this.driverAdd = this.formBuilder.group({
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


  addDriver() {

  }





}
