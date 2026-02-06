import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsList } from './equipments-list';

describe('EquipmentsList', () => {
  let component: EquipmentsList;
  let fixture: ComponentFixture<EquipmentsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
