import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../dto/Customer";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  target_url = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public createUser(name: string, address: string, salary: number): Observable<any> {
    return this.http.post(this.target_url+'customer', {
      name,
      address,
      salary
    })
  }

  public getAllCustomers(): Observable<Customer> {
    return this.http.get<Customer>(this.target_url+'customer/all');
  }

  public deleteCustomer(id: number): Observable<any> {
    return this.http.delete(this.target_url+`customer/${id}`);
  }

  public updateCustomer(id: number, name: string, address: string, salary: number): Observable<any> {
    return this.http.put(this.target_url+'customer', {
      id,
      name,
      address,
      salary
    })
  }

  public findCustomer(id: number): Observable<any> {
    return this.http.get(this.target_url+`customer/${id}`);
  }


}
