import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersForm } from './computers-form';

describe('ComputersForm', () => {
  let component: ComputersForm;
  let fixture: ComponentFixture<ComputersForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputersForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputersForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
