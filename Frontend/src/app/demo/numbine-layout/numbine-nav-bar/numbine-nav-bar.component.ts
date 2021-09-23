import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NextConfig } from 'src/app/app-config';

@Component({
  selector: 'app-numbine-nav-bar',
  templateUrl: './numbine-nav-bar.component.html',
  styleUrls: ['./numbine-nav-bar.component.scss']
})
export class NumbineNavBarComponent implements OnInit {
  public flatConfig: any;
  public menuClass: boolean;
  public collapseStyle: string;
  public windowWidth: number;

  @Output() onNavCollapse = new EventEmitter();
  @Output() onNavHeaderMobCollapse = new EventEmitter();

  constructor() {
    this.flatConfig = NextConfig.config;
    this.menuClass = false;
    this.collapseStyle = 'none';
    this.windowWidth = window.innerWidth;
  }

  ngOnInit() { }

  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.collapseStyle = (this.menuClass) ? 'block' : 'none';
  }

  navCollapse() {
    if (this.windowWidth >= 992) {
      this.onNavCollapse.emit();
    } else {
      this.onNavHeaderMobCollapse.emit();
    }
  }
}
