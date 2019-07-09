import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as Data from '../data';
import { FormGroup, FormControl } from '@angular/forms';
import { RootList, SubCategories } from '../types.interface';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  rootCategories: RootList[] = [];
  subCategories: SubCategories[] = [];

  closeResult: string = '';
  selectedCatName: string = '';
  activeTab: number = 1;

  categoryForm = new FormGroup({
    code: new FormControl(),
    parentCode: new FormControl(),
    name: new FormControl(''),
  });
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private _dataService: DataService
  ) { }

  ngOnInit() {
    this.rootCategories = [];
    Data.RootList.forEach((element, index) => {
      Data.SubCategories.forEach((el) => {
        if (el.parentCode == element.code) {
          Data.RootList[index].sub_catergories.push(el);
        }
      });
    });

    this.rootCategories = Data.RootList;

    if (this.rootCategories.length > 0) {
      this.getSubCategoriesByRootId(this.rootCategories[0]);
    }

  }

  // get all sub-category for Root category you select
  getSubCategoriesByRootId(rootCat: any) {
    this.subCategories = [];

    this.selectedCatName = rootCat.name;
    this.activeTab = rootCat.code;

    Data.SubCategories.forEach((el) => {
      if (el.parentCode == this.activeTab) {
        this.subCategories.push(el);
      }
    });

  }

  // add new sub-category
  addNewCategory() {
    let x = this.categoryForm.value;
    if (x.name != null || x.name != undefined || x.name != '') {
      let cat = {
        code: this.subCategories.length,
        name: x.name,
        parentCode: this.activeTab,
        products: []
      }
      this.subCategories.push(cat);
    }
    this.categoryForm.reset();
  }

  // open sub-category details
  openCategoryDetails(subCat: SubCategories) {
    // if (Object.keys(subCat).length > 0) {
    //   this._dataService.setOption('code', subCat.code);
    //   this._dataService.setOption('name', subCat.name);
    // }
    if(subCat){
      this.router.navigate(['/category-details', subCat.code]);
    }
  }

  // popup functions  --> open --> dismiss
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == 'Save click') {
        this.addNewCategory();
      }
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

}
