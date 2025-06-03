import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAgGridHeaderComponent } from './custom-ag-grid-header.component';

describe('CustomAgGridHeaderComponent', () => {
  let component: CustomAgGridHeaderComponent;
  let fixture: ComponentFixture<CustomAgGridHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomAgGridHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomAgGridHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
