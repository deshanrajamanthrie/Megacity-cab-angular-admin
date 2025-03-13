import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/service/Vehcile.service';
import { ToastService } from 'src/app/account/login/toast-service';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent implements OnInit {


  VehicleAdd!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private vehicleService = inject(VehicleService);
  public toastService = inject(ToastService);



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
      numberPlate: [''],
      status: ['ACTIVE'],
      driverId: ['']
    });
  }

  AddVehicleModal(addVehicleModal: any) {
    this.modalService.open(addVehicleModal, { size: 'lg' });

  }

  addVehicle() {
    if (this.VehicleAdd.valid) {
      const payload = {
        vehicleId: this.VehicleAdd.get('id')?.value,
        brand: this.VehicleAdd.get('brand')?.value,
        color: this.VehicleAdd.get('color')?.value,
        pricePreMilage: this.VehicleAdd.get('millage')?.value,
        driverId: this.VehicleAdd.get('driverId')?.value,
        fuelType: this.VehicleAdd.get('fuelType')?.value,
        licanePlateNumber: this.VehicleAdd.get('numberPlate'),
        status: this.VehicleAdd.get('status')?.value,
      }

      this.vehicleService.addVehicle(payload).subscribe({
        next: () => {
          this.toastService.show('Driver save successfully', { classname: 'bg-success text-white', delay: 15000 });
        }, error: (error) => {
          throw error;
        }
      })
    }
  }






}
