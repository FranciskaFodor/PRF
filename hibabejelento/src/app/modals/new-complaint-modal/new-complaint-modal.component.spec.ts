import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComplaintModalComponent } from './new-complaint-modal.component';

describe('NewComplaintModalComponent', () => {
  let component: NewComplaintModalComponent;
  let fixture: ComponentFixture<NewComplaintModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewComplaintModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComplaintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
