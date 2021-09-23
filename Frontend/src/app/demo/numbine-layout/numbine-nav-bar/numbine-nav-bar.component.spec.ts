import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineNavBarComponent } from './numbine-nav-bar.component';

describe('NumbineNavBarComponent', () => {
  let component: NumbineNavBarComponent;
  let fixture: ComponentFixture<NumbineNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
