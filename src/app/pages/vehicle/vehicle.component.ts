import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/service/Vehcile.service';
import { ToastService } from 'src/app/account/login/toast-service';
import { DriverService } from 'src/app/service/Driver.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent implements OnInit {


  VehicleAdd!: FormGroup;
  VehicleUpdateForm!: FormGroup
  private formBuilder = inject(FormBuilder);
  private vehicleService = inject(VehicleService);
  public toastService = inject(ToastService);
  private driverService = inject(DriverService);
  private ngxLoader = inject(NgxUiLoaderService);
  private toster = inject(ToastrService);



  ngOnInit(): void {
    this.iniProject();
    this.getAllDriver();
    this.getAllVehicle();
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
      drivers: ['']
    });

    this.VehicleUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      brand: [''],
      millage: [],
      fuelType: [''],
      color: [''],
      numberPlate: [''],
      status: ['ACTIVE'],
      drivers: ['']
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
        driverId: this.VehicleAdd.get('drivers')?.value,
        fuelType: this.VehicleAdd.get('fuelType')?.value,
        licanePlateNumber: this.VehicleAdd.get('numberPlate')?.value,
        status: this.VehicleAdd.get('status')?.value,
      }
      this.ngxLoader.start();
      console.log('Vehicle data :', payload);

      this.vehicleService.addVehicle(payload).subscribe({
        next: () => {
          this.VehicleAdd.reset();
          this.ngxLoader.stop();
          this.getAllVehicle();
          this.modalService.dismissAll('close');
          this.toster.success('Vehicle save successfully', 'Success');
        }, error: (error) => {
          this.ngxLoader.start();
          throw error;
        }
      })
    }
  }
  driverData: any;

  getAllDriver() {
    this.ngxLoader.start();
    this.driverService.driverGetAll().subscribe({
      next: (res) => {
        this.driverData = res;
        this.ngxLoader.stop();
      }
      , error: (err) => {
        this.ngxLoader.stop();
        throw err;

      }
    })
  }

  vehicleData: any;

  getAllVehicle() {
    this.ngxLoader.start();
    this.vehicleService.vehicleGetAll().subscribe({
      next: (res) => {
        this.vehicleData = res;
        this.ngxLoader.stop();
      }
      , error: (err) => {
        this.ngxLoader.stop();
        throw err;

      }
    })
  }


  updateVehicleModal(UpdateDriverModal: any, item: any) {
    this.modalService.open(UpdateDriverModal, { size: 'lg' });
    this.VehicleUpdateForm.patchValue({
      id: item.vehicleId,
      brand: item.brand,
      millage: item.pricePreMilage,
      fuelType: item.fuelType,
      color: item.color,
      numberPlate: item.licanePlateNumber,
      status: item.status,
      drivers: item.driverId
    })
  }

  updateVehicle() {
    console.log('yooo ');

    if (this.VehicleUpdateForm.valid) {
      const payload = {
        vehicleId: this.VehicleUpdateForm.get('id')?.value,
        brand: this.VehicleUpdateForm.get('brand')?.value,
        color: this.VehicleUpdateForm.get('color')?.value,
        pricePreMilage: this.VehicleUpdateForm.get('millage')?.value,
        driverId: this.VehicleUpdateForm.get('drivers')?.value,
        fuelType: this.VehicleUpdateForm.get('fuelType')?.value,
        licanePlateNumber: this.VehicleUpdateForm.get('numberPlate')?.value,
        status: this.VehicleUpdateForm.get('status')?.value,
      }
      console.log('update:', payload);

      this.vehicleService.updateVehicle(payload).subscribe({
        next: () => {
          this.getAllVehicle();
          this.ngxLoader.stop();
          this.modalService.dismissAll('close');
          this.toster.success('Vehicle update successfully', 'Success');
        }, error: (eror) => {
          this.ngxLoader.stop();
          throw eror;
        }
      })

    }

  }

  deleteVehcile(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this driver?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.value) {
        this.ngxLoader.start();
        this.driverService.deleteDriver(id).subscribe({
          next: () => {
            this.toster.success('Delete Vehicle successfully', 'Success');
            this.getAllDriver();
            this.ngxLoader.stop();
          }, error: (error: any) => {
            this.ngxLoader.stop();
            throw error;
          }
        })
      }
    });
  }



}
