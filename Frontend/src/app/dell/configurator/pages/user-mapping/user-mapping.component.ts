import { Component, OnInit } from '@angular/core';
import { DataTable } from '../../../models/DataTable';
import { Product } from '../../../models/Product';
import { User } from '../../../models/User';
import { ActionAlertService } from '../../../services/dialogService/action-alert.service';
import { ProductService } from '../../../services/ProductService/product.service';

@Component({
  selector: 'app-user-mapping',
  templateUrl: './user-mapping.component.html',
  styleUrls: ['./user-mapping.component.scss']
})
export class UserMappingComponent implements OnInit
{
  public usersPerProduct: User[][] = [];
  public products: Product[] = [];
  public cardTitle = "User Mapping";
  public productTitles = ['ID', 'Product Name', 'User Emails'];
  public userTitles = ['ID', 'User Email'];
  public productRows = [[]];
  public productDataTable = new DataTable();
  public userRows = [[]];
  public userDataTable = new DataTable();

  currentProduct: Product;
  currentUser: User;
  currentProductUsers: User[] = [];

  public loading = true;
  public updating = false;
  hasBeenChanged = false;
  constructor(private productService: ProductService, private alertService: ActionAlertService) 
  {
    this.updateFunction = this.updateFunction.bind(this);
    this.deleteFunction = this.deleteFunction.bind(this);
  }

  ngOnInit(): void
  {
    // Tables
    this.productDataTable.rows = this.productRows;
    this.productDataTable.titles = this.productTitles;

    this.userDataTable.rows = this.userRows;
    this.userDataTable.titles = this.userTitles;


    let productObs = this.productService.getAllProducts(); // getDummyProducts(); //
    productObs.subscribe(products =>
    {
      this.products = products;
      this.updateUserListPerProduct();
    })
  }

  /**
   * Updates the user lists for each product
   */
  updateUserListPerProduct()
  {
    this.usersPerProduct.length = 0;
    this.products.forEach(product => 
    {
      this.usersPerProduct.push(product.users);
    })
    this.loading = false;
    this.updateTable();
  }

  /**
   * Updates the product-user mapping table
   */
  updateTable()
  {
    this.productRows.length = 0;
    this.productDataTable = new DataTable()
    this.productDataTable.rows = this.productRows;
    this.productDataTable.titles = this.productTitles;
    for (let i = 0; i < this.products.length; i++)
    {
      if (this.products[i].users != null)
      {
        let emails = User.getEmailsFromUserList(this.usersPerProduct[i]);
        if(emails == "") emails = "None"
        this.productRows.push([this.products[i].id, this.products[i].productName, emails])
      }
    }
  }

  /**
   * Opens the update user mapping page for the selected product
   * @param index 
   */
  updateFunction(index: number)
  {
    this.currentProduct = this.products[index];
    this.copyCurrentProductUsersList();
    this.cardTitle = "User Mapping - Update Users [" + this.currentProduct.productName + "]";
    this.updating = true;
    this.updateUsersPerProductTable();
  }

  /**
   * Create a local copy of the user list to use when adding and removing users
   */
  private copyCurrentProductUsersList()
  {
    this.currentProductUsers.length = 0;
    for (let i = 0; i < this.currentProduct.users.length; i++)
    {
      this.currentProductUsers.push(this.currentProduct.users[i]);
    }
  }

  /**
   * Update the users per product table
   */
  private updateUsersPerProductTable()
  {
    this.userRows.length = 0;
    this.userDataTable = new DataTable();
    this.userDataTable.rows = this.userRows;
    this.userDataTable.titles = this.userTitles;
    for (let i = 0; i < this.currentProductUsers.length; i++)
    {
      this.userRows.push([this.currentProductUsers[i].id, this.currentProductUsers[i].email]);
    }
  }

  /**
   * Set the current user based on what is selected in the select box
   * @param user 
   */
  setActiveUser(user: User)
  {
    this.currentUser = user;
  }

  /**
   * Add the selected use to the product
   */
  addUser()
  {
    if (this.currentUser == null)
    {
      this.alertService.alert("Please select a user first", 1500, true, 'center', 'warning')
    }
    else
    {
      let found = false;
      for (let i = 0; i < this.currentProductUsers.length; i++) 
      {
        if (this.currentProductUsers[i].id == this.currentUser.id)
        {
          found = true;
        }
      }
      if (!found)
      {
        // this.currentProductUsers.push(this.currentUser); // Need to add to first row
        this.currentProductUsers.splice(0, 0, this.currentUser);
        this.alertService.alert("Added user " + this.currentUser.name, 2000, true, 'center');
        this.updateUsersPerProductTable();
        this.hasBeenChanged = true;
      }
      else
      {
        this.alertService.alert("User " + this.currentUser.name + " already exists!", 2000, true, 'center', 'error');
      }
    }
  }

  /**
   * Delete the selected user from this product
   * @param index 
   */
  deleteFunction(index: number)
  {
    this.alertService.confirmAlert("", "Are you sure you want to delete " + this.currentProductUsers[index].name + "?",
      "", "", "", "", () =>
      {
        let deleted = this.currentProductUsers.splice(index, 1);
        this.alertService.alert("Removed user " + deleted[0].name, 2000, false, 'center');
        this.hasBeenChanged = true;
        this.updateUsersPerProductTable();
      }, () => { }, 'warning')
  }

  /**
   * Save the changes in the database
   */
  saveNewUsers()
  { // TODO: Check if I need to get the products again from the server after saving
    if (this.hasBeenChanged)
    {
      let obs = this.productService.updateProductUserList(this.currentProduct.id, this.currentProductUsers);
      this.alertService.loadingMenu("Saving...", obs, success =>
      {
        this.alertService.alertWithCallback("User list successfully updated!", 2500, false,()=>
        {
          this.currentProduct.users = this.currentProductUsers;
          this.updating = false;
        }, 'center');
      }, error =>
      {
        this.alertService.alert("Failed to save!", 2500, false, 'center', 'error');
      });
    }
    else
    {
      this.alertService.alert("No changes detected", 1500, true, 'bottom', 'info');
    }
  }


  /**
   * Cancel and return to User Mapping
   */
  cancelAddUsers()
  {
    if (this.hasBeenChanged)
    {
      this.alertService.confirmAlert("", "You have unsaved changes. Are you sure you want to cancel?", "", "", "", "",
        () =>
        {
          this.currentProductUsers.length = 0;
          this.updating = false;
          this.hasBeenChanged = false;
          this.cardTitle = "User Mapping";
        }, () =>
      {

      },'warning')
    }
    else
    {
      this.currentProductUsers.length = 0;
      this.updating = false;
      this.cardTitle = "User Mapping";
    }
  }
}
