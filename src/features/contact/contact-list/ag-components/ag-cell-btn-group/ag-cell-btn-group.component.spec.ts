import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgCellBtnGroupComponent } from './ag-cell-btn-group.component';

describe('AgCellBtnGroupComponent', () => {
  let component: AgCellBtnGroupComponent;
  let fixture: ComponentFixture<AgCellBtnGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgCellBtnGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgCellBtnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
