import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

interface ICustomCellRendererParams extends ICellRendererParams {
  onDelete : (data: any) => void;
  onEdit : (data : any) => void;
  onToggleFavorite : (data : any) => boolean;
}

@Component({
  selector: 'app-ag-cell-btn-group',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <ng-container *ngIf="showBtns">
      <div class="d-flex justify-content-center align-items-center">
        <button (click)="toggleFavorite()" [title]="'shared.Favorite'| translate" class="btn bg-transparent p-2 m-0">
            <i class="bi" [ngClass]="isFavorite ? 'bi-star-fill text-warning' : 'bi-star'"></i>
        </button>
        <button (click)="onEditClicked()" [title]="'shared.Edit' | translate" class="btn bg-transparent p-2 m-0"><i class="bi bi-pencil-fill text-secondary"></i></button>
        <button (click)="onDeleteClicked()" [title]="'shared.Delete' | translate" class="btn bg-transparent p-2 m-0"><i class="bi bi-trash-fill text-danger"></i></button>
      </div>  
    </ng-container>
  `,
  styles: ``
})

export class AgCellBtnGroupComponent implements ICellRendererAngularComp{
  
  constructor(){}

  showBtns : boolean = false;
  isFavorite : boolean = false;
  params!: ICustomCellRendererParams; 
  
  agInit(params: ICustomCellRendererParams): void {
    this.params = params;
    this.isFavorite = params.data["isFavorite"];
  }
  
  refresh(params: ICustomCellRendererParams): boolean {
    return false;
  }

  toggleVisibility(visibility : boolean) : void {
    this.showBtns = visibility;
  }

  onEditClicked() : void {
    this.params.onEdit(this.params.data);
  }

  onDeleteClicked() : void {
    this.params.onDelete(this.params.data);
  }

  toggleFavorite() : void {
    const isSuccess : boolean = this.params.onToggleFavorite(this.params.data);
    if(isSuccess){
      this.isFavorite = !this.isFavorite;
      this.params.data["isFavorite"] = this.isFavorite;
    }
  }

}
