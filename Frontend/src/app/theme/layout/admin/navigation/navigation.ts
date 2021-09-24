import { CanActivate } from '@angular/router';
import {Injectable} from '@angular/core';

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
    children: 
    [
      {
        id: 'admin',
        title: 'Admin',
        type: 'collapse',
        icon: 'feather icon-user',
        hidden:false,
        children: [
          {
            id: 'accessPage',
            title: 'Dashboard',
            type: 'item',
            url: '/stop/admin/table'
          },
        ]
      },
      {
        id: 'admin',
        title: 'School',
        type: 'collapse',
        icon: 'feather icon-user',
        hidden:false,
        children: [
          {
            id: 'accessPage',
            title: 'Dashboard',
            type: 'item',
            url: '/stop/school/table'
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