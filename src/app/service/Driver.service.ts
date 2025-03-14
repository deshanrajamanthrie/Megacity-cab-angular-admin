import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";



const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API_URL = environment.apiURL + 'driver'


@Injectable({
    providedIn: 'root'
})

export class DriverService {


    constructor(private http: HttpClient) {

    }

    addDriver(driver: any): Observable<any> {
        return this.http.post<any>(API_URL, driver, httpOptions);
    }

    driverGetAll(): Observable<any> {
        return this.http.get<any>(API_URL);
    }

    updateDriver(data: any): Observable<any> {
        return this.http.put<any>(API_URL, data, httpOptions);
    }
    deleteDriver(id: string): Observable<any> {
        return this.http.delete<any>(API_URL + '/' + id, httpOptions)
    }



}