import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as Data from '../data';
import { Products } from './../types.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  subCatObj: number;
  products: Products[] = [];
  closeResult: string = '';

  productForm = new FormGroup({
    code: new FormControl(),
    parentCode: new FormControl(),
    name: new FormControl(''),
    price: new FormControl(0)
  });

  constructor(
    private modalService: NgbModal,
    private _route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.subCatObj = +this._route.snapshot.paramMap.get('id');
    if (this.subCatObj) {
      this.getProducts(this.subCatObj);
    }
  }

  //# start crud operation of products
  getProducts(code: number) {
    Data.Products.forEach((el) => {
      if (el.parentCode == code) {
        this.products.push(el);
      }
    });
    if (this.products.length > 0) {
      this.products.forEach(el => {
        el.check = false;
      });
    }
  }

  addProduct() {
    let x = this.productForm.value;
    const maxCode = Math.max(...this.products.map(el => el.code), 0);
    //console.log(Math.max.apply(Math, this.products.map(function(el) { return el.code; })));
    if (x && Object.keys(x).length > 0) {
      let prod = {
        code: maxCode + 1,
        name: x.name,
        parentCode: this.subCatObj,
        price: x.price
      }
      this.products.push(prod);
    }
  }

  updateProduct() {
    let y = this.productForm.value;
    if (y && Object.keys(y).length > 0) {
      let UpdatedObj = this.getSelectedObject(y.code, this.products);
      if (UpdatedObj.code > 0) {
        UpdatedObj.name = y.name;
        UpdatedObj.price = y.price;
      } else {
        this.addProduct();
      }
    }
  }

  deleteProducts() {
    debugger;
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].check === true) {
        this.products.splice(i, 1);
        i--;
      }
    }
  }
  //# end crud operation of products

  // popup functions  --> open --> dismiss
  openModal(content, data: Products) {
    if (data.code > 0) {
      this.productForm.patchValue(data);
    } else {
      this.productForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (data.code > 0) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
    }, (reason) => {
      console.log(`Dismissed => ${reason}`);
    });
  }


  // helper function
  getSelectedObject(code, list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].code == code) {
        return list[i];
      }
    }
  }

}
