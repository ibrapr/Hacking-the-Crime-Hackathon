import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseSelectorComponent } from './release-selector.component';

describe('ReleaseSelectorComponent', () => {
  let component: ReleaseSelectorComponent;
  let fixture: ComponentFixture<ReleaseSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
