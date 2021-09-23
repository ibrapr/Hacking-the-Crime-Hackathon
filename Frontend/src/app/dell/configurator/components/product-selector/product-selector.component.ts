import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/dell/models/Product'
import { NumbineSelectBoxComponent } from '../../../general-components/numbine-select-box/numbine-select-box.component';
import { SelectBoxItem } from '../../../models/SelectBoxItem';
import { DataService } from '../../../services/DataService/data.service';
import { ProductService } from '../../../services/ProductService/product.service';
@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.scss']
})
export class ProductSelectorComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public labelText: string = "";
  @Input() // If you don't give a productList, it gets all products from the server
  public productList: Product[];

  public selectBoxItems: SelectBoxItem[];

  selectedProduct: Product;
  productSubscription: Subscription;
  hintText: String = "Select Product";
  defaultHintText: String = "Select Product";

  @Output()
  public onSelectionChanged: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private productService: ProductService, private dataService: DataService) { }


  ngOnInit(): void {
    // Get All Products
    if (this.productList == null) {
      let obsProducts = this.productService.getAllProducts();//.getDummyProducts();
      obsProducts.subscribe(products => {
        this.productList = products;
        this.updateSelectOptions();
      }, error => {
        alert("Error in loading products, product-selector.component.ts");

      });
    }
    // Subscribe the selectedProduct to the value saved in the Data Service
    this.productSubscription = this.dataService.currentProduct.subscribe(currentProduct => {
      this.selectedProduct = currentProduct;
      this.hintText = (this.selectedProduct == null) ? this.defaultHintText : this.selectedProduct.productName;
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateSelectOptions();
    this.onSelectProduct(0);
  }
  // We must unsubscribe before the component gets destroyed!
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

  public updateSelectOptions() {
    this.selectBoxItems = this.generateSelectOptions();
  }

  generateSelectOptions(): SelectBoxItem[] {
    if (this.productList == null) return null;
    let items: string[] = [];
    for (let i = 0; i < this.productList.length; i++) {
      items.push(this.productList[i]?.productName);
    }
    return SelectBoxItem.getSelectBoxArray(items);
  }

  onSelectProduct(index: number) {
    if (!!this.productList) {
      if(index == -1)
      {
        this.dataService.changeProduct(null);
        this.hintText = this.defaultHintText;
      }
      else
      {
        this.dataService.changeProduct(this.productList[index]);
        if (this.selectedProduct != null)
          this.hintText = this.selectedProduct.productName;
      }
      this.onSelectionChanged.emit(this.selectedProduct);
    }
    else {
      this.hintText = this.defaultHintText;
    }
  }
}
