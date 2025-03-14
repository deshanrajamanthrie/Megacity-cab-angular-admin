import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DriverService } from 'src/app/service/Driver.service';
import { ToastService } from 'src/app/account/login/toast-service';
import { SharedModule } from 'src/app/shared/shared.module';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-driver',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CommonModule,
    SharedModule,
    FormsModule,],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.scss'
})
export class DriverComponent {

  driverAdd!: FormGroup;
  updateDriver!: FormGroup;
  private modalService = inject(NgbModal);
  private toster = inject(ToastrService);

  private formBuilder = inject(FormBuilder);
  private driverService = inject(DriverService);
  private ngxLoader = inject(NgxUiLoaderService);
  driverData: any
  constructor(public toastService: ToastService) {

  }
  ngOnInit(): void {
    this.iniProject();
    this.getAllDriver();
  }

  iniProject() {
    this.driverAdd = this.formBuilder.group({
      id: ['', Validators.required],
      name: [''],
      contactNumber: [''],
      address: [''],
    });

    /* update driver */
    this.updateDriver = this.formBuilder.group({
      id: ['', Validators.required],
      name: [''],
      contactNumber: [''],
      address: [''],
    });
  }

  AddVehicleModal(addVehicleModal: any) {
    this.modalService.open(addVehicleModal, { size: 'lg' });
  }

  addDriver() {
    if (this.driverAdd.valid) {
      const payload = {
        driverId: this.driverAdd.get('id')?.value,
        name: this.driverAdd.get('name')?.value,
        phone: this.driverAdd.get('contactNumber')?.value,
        address: this.driverAdd.get('address')?.value,
      }
      console.log(payload);
      this.ngxLoader.start();
      this.driverService.addDriver(payload).subscribe({
        next: () => {
          console.log('log success');
          this.driverAdd.reset();
          this.getAllDriver();
          this.ngxLoader.stop();
          this.modalService.dismissAll('close');
          this.toster.success('Driver save  successfully', 'Success');
        }, error: (error) => {
          throw error;
        }
      })
    }
  }

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


  /*===================================================  update driver=============================== */

  updateDriverModal(UpdateDriverModal: any, item: any) {
    this.modalService.open(UpdateDriverModal, { size: 'lg' });
    this.updateDriver.patchValue({
      id: item.driverId,
      name: item.name,
      contactNumber: item.phone,
      address: item.address,
    })
  }

  EditDriver() {
    if (this.updateDriver.valid) {
      const payload = {
        driverId: this.updateDriver.get('id')?.value,
        name: this.updateDriver.get('name')?.value,
        phone: this.updateDriver.get('contactNumber')?.value,
        address: this.updateDriver.get('address')?.value,
      }
      this.ngxLoader.start();
      this.driverService.updateDriver(payload).subscribe({
        next: () => {
          this.updateDriver.reset();
          this.getAllDriver();
          this.modalService.dismissAll('close');
          this.toster.success('Update driver successfully', 'Success');
          this.ngxLoader.stop();
        }, error: (error) => {
          this.ngxLoader.stop();
          throw error;
        }
      })
    }
  }

  deleteDriver(id: any) {
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
            this.toster.success('Delete driver successfully', 'Success');
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
