import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersList } from './computers-list';

describe('ComputersList', () => {
  let component: ComputersList;
  let fixture: ComponentFixture<ComputersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputersList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
