import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsForm } from './labs-form';

describe('LabsForm', () => {
  let component: LabsForm;
  let fixture: ComponentFixture<LabsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
