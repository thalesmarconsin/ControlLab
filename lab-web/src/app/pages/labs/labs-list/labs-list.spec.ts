import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsList } from './labs-list';

describe('LabsList', () => {
  let component: LabsList;
  let fixture: ComponentFixture<LabsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
