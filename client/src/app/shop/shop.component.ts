import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  brandIdSelected: number;
  typeIdSelected:number;

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.getProduct();
    this.getBrands();
    this.getTypes();
  }

  getProduct() {
    this.shopService.getProducts().subscribe(response => {
      this.products = response.data;
    }, error => {
      console.log(error);
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }
  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandId:number){
    this.brandIdSelected = brandId;
    this.getProduct();
  }

}
