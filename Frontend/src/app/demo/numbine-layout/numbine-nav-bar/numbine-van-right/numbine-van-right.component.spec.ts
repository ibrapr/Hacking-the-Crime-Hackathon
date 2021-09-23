import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineVanRightComponent } from './numbine-van-right.component';

describe('NumbineVanRightComponent', () => {
  let component: NumbineVanRightComponent;
  let fixture: ComponentFixture<NumbineVanRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineVanRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineVanRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
