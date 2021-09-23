import { CanActivate } from '@angular/router';
import {Injectable} from '@angular/core';
import { AdminPermissionGuardService } from 'src/app/admin-permission-guard.service';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'menu',
    title: 'Menu',
    type: 'group',
    icon: 'feather icon-monitor',
    children: [
      {
        id: 'admin',
        title: 'Admin',
        type: 'collapse',
        icon: 'feather icon-user',
        hidden:true,
        children: [
          {
            id: 'chartsPage',
            title: 'Charts',
            type: 'item',
            url: '/dell/admin/chartsPage'
          },
          {
            id: 'accessPage',
            title: 'Access',
            type: 'item',
            url: '/dell/admin/accessPage'
          },
          {
            id: 'dashboardpage',
            title: 'Admin Dashboard',
            type: 'item',
            url: '/dell/admin/dashboardPage'
          },
          {
            id: 'forumPage',
            title: 'Forum',
            type: 'item',
            url: '/dell/admin/forumPage'
          },
        ]
      },
      {
        id: 'config',
        title: 'Configurator',
        type: 'collapse',
        icon: 'feather icon-user',
        hidden:true,
        children: [
          {
            id: 'dashboardconfig',
            title: 'Configurator Dashboard',
            type: 'item',
            url: '/dell/config/dashboardconfig'
          }
          ,
          {
            id: 'products',
            title: 'Products',
            type: 'item',
            url: '/dell/config/products'
          },
          {
            id: 'userMapping',
            title: 'User Mapping',
            type: 'item',
            url: '/dell/config/userMapping'
          },
          {
            id: 'releases',
            title: 'Releases',
            type: 'item',
            url: '/dell/config/releases'
          },
          {
            id: 'testConfiguration',
            title: 'Parameters ',
            type: 'item',
            url: '/dell/config/testConfiguration'
          },
          {
            id: 'productReleaseMapping',
            title: 'Product Release Mapping',
            type: 'item',
            url: '/dell/config/productReleaseMapping'
          },
        ]
      },
      {
        id: 'tester',
        title: 'Tester',
        type: 'collapse',
        icon: 'feather icon-user',
        hidden:true,
        children: [
          {
            id: 'userDashBoard',
            title: 'Tester Dashboard',
            type: 'item',
            url: '/dell/tester/userDashBoard'
          },
          {
            id: 'userConfigGenerator',
            title: 'Configuration Generator',
            type: 'item',
            url: '/dell/tester/userConfigGenerator'
          },
        ]
      },
    ]
  },
];

@Injectable()
export class NavigationItem {
  constructor(){}
  public get() {
    return NavigationItems;
  }
  public setHidden(bool: boolean,type: string): void {
    for (const item of NavigationItems){
      for(const itemChild of item.children){
        if(itemChild.id===type){
          itemChild.hidden=bool;
        }
      }
    }
  }
}