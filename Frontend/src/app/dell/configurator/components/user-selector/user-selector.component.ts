import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectBoxItem } from '../../../models/SelectBoxItem';
import { User } from '../../../models/User';
import { DataService } from '../../../services/DataService/data.service';
import { UserService } from '../../../services/UserService/user.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit, OnChanges {

  @Input()
  public labelText: string = "";
  @Input() // If you don't give a userList, it gets all products from the server
  public userList: User[];

  public selectBoxItems: SelectBoxItem[];

  selectedUser: User;
  hintText: String = "Select User";
  defaultHintText: String = "Select User";

  @Output()
  public onSelectionChanged: EventEmitter<User> = new EventEmitter<User>();

  constructor(private userService: UserService, private dataService: DataService) { }


  ngOnInit(): void {
    // Get All Products
    if (this.userList == null) {
      let obsProducts = this.userService.getAllUsers();
      obsProducts.subscribe(products => {
        this.userList = products;
        this.updateSelectOptions();
      }, error => {
        alert("Error in loading products, product-release-mapping.component.ts");

      });
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateSelectOptions();
    this.onSelectProduct(0);
  }

  public updateSelectOptions() {
    this.selectBoxItems = this.generateSelectOptions();
  }

  generateSelectOptions(): SelectBoxItem[] {
    if (this.userList == null) return null;
    let items: string[] = [];
    for (let i = 0; i < this.userList.length; i++) {
      items.push(this.userList[i]?.name);
    }
    return SelectBoxItem.getSelectBoxArray(items);
  }

  onSelectProduct(index: number) {
    if (!!this.userList) {
      if (index == -1) {
        this.dataService.changeProduct(null);
        this.hintText = this.defaultHintText;
      }
      else {
        this.selectedUser = this.userList[index];
        if (!!this.selectedUser)
          this.hintText = this.selectedUser.name;
      }
      this.onSelectionChanged.emit(this.selectedUser);
    }
    else {
      this.hintText = this.defaultHintText;
    }
  }


}
