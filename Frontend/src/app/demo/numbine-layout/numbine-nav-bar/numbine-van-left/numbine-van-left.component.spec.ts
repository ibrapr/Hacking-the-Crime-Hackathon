import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineVanLeftComponent } from './numbine-van-left.component';

describe('NumbineVanLeftComponent', () => {
  let component: NumbineVanLeftComponent;
  let fixture: ComponentFixture<NumbineVanLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineVanLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineVanLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
