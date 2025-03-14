import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API_URL = environment.apiURL + 'vehicle'

@Injectable({
    providedIn: 'root'
})

export class VehicleService {


    constructor(private http: HttpClient) {

    }

    addVehicle(vehicle: any): Observable<any> {
        return this.http.post<any>(API_URL, vehicle, httpOptions);
    }

    vehicleGetAll(): Observable<any> {
        return this.http.get<any>(API_URL, httpOptions);
    }

    updateVehicle(payload: any): Observable<any> {
        return this.http.put<any>(API_URL, payload, httpOptions);
    }

}