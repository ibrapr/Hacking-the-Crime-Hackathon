import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConfigrationsEditNewComponent } from './test-configrations-edit-new.component';

describe('TestConfigrationsEditNewComponent', () => {
  let component: TestConfigrationsEditNewComponent;
  let fixture: ComponentFixture<TestConfigrationsEditNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestConfigrationsEditNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestConfigrationsEditNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
