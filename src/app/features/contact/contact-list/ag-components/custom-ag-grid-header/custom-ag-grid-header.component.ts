import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-ag-grid-header',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-center align-items-center h-100">
      <button title="Export Contacts to CSV" class="btn bg-transparent p-0 me-2">
        <i class="bi bi-upload"></i>
      </button>
      <input title="Select All" type="checkbox" style="height: 16px; width: 16px;">
    </div>
  `,
  styles: `  
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
  `
})
export class CustomAgGridHeaderComponent implements IHeaderAngularComp {
  
  params !: IHeaderParams;
  
  agInit(params: IHeaderParams<any, any>): void {
    this.params = params;
  }
  refresh(params: IHeaderParams): boolean {
    return false;
  }

}
