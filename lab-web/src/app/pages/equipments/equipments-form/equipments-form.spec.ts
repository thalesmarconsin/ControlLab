import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsForm } from './equipments-form';

describe('EquipmentsForm', () => {
  let component: EquipmentsForm;
  let fixture: ComponentFixture<EquipmentsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
