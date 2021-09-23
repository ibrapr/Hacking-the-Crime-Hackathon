import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './dell/admin/admin.module';
import { ConfiguratorModule } from './dell/configurator/configurator.module';
import { DellRoutingModule } from './dell/dell-routing.module';
import { NumbineLayComponent } from './demo/numbine-layout/numbine-lay/numbine-lay.component';
import { NumbineNavBarComponent } from './demo/numbine-layout/numbine-nav-bar/numbine-nav-bar.component';
import { NumbineVanLeftComponent } from './demo/numbine-layout/numbine-nav-bar/numbine-van-left/numbine-van-left.component';
import { NumbineVanRightComponent } from './demo/numbine-layout/numbine-nav-bar/numbine-van-right/numbine-van-right.component';
import { UserPermissionGuardService } from './user-permission-guard.service';
import { UserPermissionService } from './user-permission.service';
import { FormsModule } from '@angular/forms';
import { GeneralComponentsModule } from './dell/general-components/general-components.module';
import { DellModule } from './dell/dell.module';


@NgModule({
  declarations: [

    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    NumbineLayComponent,
    NumbineNavBarComponent,
    NumbineVanLeftComponent,
    NumbineVanRightComponent
  ],
  imports: [
    GeneralComponentsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    HttpClientModule,
    NgbTabsetModule,
    DellRoutingModule,
    AdminModule,
    AdminModule,//need to fix
    DellModule,
    ConfiguratorModule,
    NgSelectModule
  ],
  providers: [NavigationItem, UserPermissionService, UserPermissionGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
