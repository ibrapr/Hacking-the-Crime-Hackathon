import { Component, OnInit } from '@angular/core';
import { NextConfig } from 'src/app/app-config';

@Component({
  selector: 'app-numbine-van-left',
  templateUrl: './numbine-van-left.component.html',
  styleUrls: ['./numbine-van-left.component.scss']
})
export class NumbineVanLeftComponent implements OnInit {

  public flatConfig: any;

  constructor() {
    this.flatConfig = NextConfig.config;
  }

  ngOnInit() {
  }
}
