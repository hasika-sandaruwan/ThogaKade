import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "./service/customer.service";
import {Customer} from "./dto/Customer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private service: CustomerService) {

  }

  ngOnInit(): void {
    this.loadAllCustomers();
  }

  dataList: Customer[] = [];

  private loadAllCustomers() {
    this.service.getAllCustomers().subscribe(result => {
      // @ts-ignore
      this.dataList = result
      console.log(this.dataList)
    }, error => {
      console.log(error);
    })
  }

  customerForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required)
  });

  createCustomer() {
    this.service.createUser(
      this.customerForm.get('name')?.value,
      this.customerForm.get('address')?.value,
      Number.parseInt(this.customerForm.get('salary')?.value)
    ).subscribe(result => {
      alert('saved!');
      console.log(result)
    }, error => {
      console.log(error)
    })
  }


  deleteCustomer(id: number) {
    if (confirm('Are You sure?')) {
      this.service.deleteCustomer(id).subscribe(result => {
        alert('deleted');
        console.log(result)
        this.loadAllCustomers();
      }, error => {
        console.log(error);
      })
    }
  }

  updateCustomer() {
    this.service.updateCustomer(
      Number.parseInt(this.customerForm.get('id')?.value),
      this.customerForm.get('name')?.value,
      this.customerForm.get('address')?.value,
      Number.parseInt(this.customerForm.get('salary')?.value)
    ).subscribe(result => {
      alert('updated!');
      console.log(result)
      this.loadAllCustomers();
    }, error => {
      console.log(error)
    })
  }

  // @ts-ignore
  customer: Customer = null;

  findCustomer(id: string) {
    this.service.findCustomer(Number.parseInt(id)).subscribe(result => {
      console.log(result)
      this.customer = result;
    }, error => {
      console.log(error);
    })
  }
}
