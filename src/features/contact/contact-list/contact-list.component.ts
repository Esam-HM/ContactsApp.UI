import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { IContactList } from '../models/contact-list-request';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AlertMessageComponent } from "../../../components/alert-message/alert-message.component";
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import type { CellMouseOutEvent, CellMouseOverEvent, ColDef, GridApi, GridOptions, GridReadyEvent} from 'ag-grid-community';
import { CustomAgGridHeaderComponent } from './ag-components/custom-ag-grid-header/custom-ag-grid-header.component';
import { themeMaterial } from 'ag-grid-community';
import { AgCellBtnGroupComponent } from './ag-components/ag-cell-btn-group/ag-cell-btn-group.component';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";


@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [AgGridAngular, CommonModule, RouterLink, AlertMessageComponent, ConfirmationModalComponent, SpinnerComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {

  constructor(private contactService: ContactService,
    private router: Router
  ) 
  {
    //this.getNavigationMessage();
  }

  showAlert : boolean = false;
  alertMessage : string = "";
  alertType : number = 0;
  message : string = '';

  showConfirmBox : boolean = false;

  showSpinner : boolean = false;
  spinnerMessage : string = "";

  contactList?: IContactList[];
  contactToDelete!: IContactList;

  colDefs : ColDef[] = [
    {headerName : "#" , width: 80, valueGetter : 'node.rowIndex+1'},
    {field : "name", flex: 1, maxWidth : 200},
    {headerName : "Phone", field : "phoneNumber", flex: 1, maxWidth: 180},
    {field : "email", flex : 1},
    {
      field: "action", 
      headerComponent: CustomAgGridHeaderComponent,
      cellRenderer : AgCellBtnGroupComponent,
      cellRendererParams : {
        onDelete : (rowData : IContactList) => this.onDeleteContact(rowData),
        onEdit : (rowData : IContactList) => this.onEditContact(rowData.id),
        onToggleFavorite : (rowData : IContactList) => this.toggleFavorite(rowData),
      },
      flex : 1
    }
  ];

  defaultColDef: ColDef = {
    resizable: false,
    filter: false,
    sortable: false,
    cellStyle : {
      border : "none"
    }
  };

  sampleData : IContactList[] = [
    {id : 1, name : "hrte Huntres kttıw fjfı", surname : null, phoneNumber : "555 555 00 01", email: null, isFavorite : false},
    {id : 2, name : "Game", surname : "herca", phoneNumber : "551 555 65 02", email: "game.dev.kaol@gmail.com", isFavorite : false},
    {id : 3, name : "Faruk", surname : "LOpi", phoneNumber : "551 145 43 21", email: null, isFavorite : true},
    {id : 12, name : "Jonny", surname : null, phoneNumber : "551 563 11 13", email: null, isFavorite : false}
  ];

  gridApi !: GridApi;
  gridOptions !: GridOptions;

  getContactsSubscription? : Subscription;
  deleteContactSubscription? : Subscription;

  onGridReady(params: GridReadyEvent) {
    console.log("OnGridReady");
    this.gridApi = params.api;

    if(this.contactList){
      console.log("hhhhh onGridReady");
      this.gridApi.applyTransactionAsync({add : this.contactList});
    }
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.gridOptions = {
      theme: themeMaterial,
      pagination : true,
      paginationPageSize : 20,
      paginationPageSizeSelector : [10, 20, 50],
      columnDefs : this.colDefs,
      defaultColDef : this.defaultColDef,
    };

    this.getContactsSubscription = this.contactService.getAllContacts().subscribe({
      next: (response) => {
        this.contactList = response;
        if(this.gridApi){
          console.log("hhhhh ngOnInit");
          this.gridApi.applyTransactionAsync({add : this.contactList})
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
    
    this.getNavigationMessage();

  }

  onDeleteContact(contact : IContactList) : void {
    this.showConfirmBox = true;
    this.contactToDelete = contact;
  }

  deleteContact() : void {
    this.showConfirmBox= false;
    this.gridApi.applyTransactionAsync({remove : [this.contactToDelete]});
    this.showAlertMessage(1, `${this.contactToDelete.name} deleted successfully`);
    // this.showSpinner=true;
    // this.spinnerMessage = "Deleting Contact...";
    // this.deleteContactSubscription = this.contactService.deleteContact(this.contactToDelete.id).subscribe({
    //   next: (response) => {
    //     this.showSpinner = false;
    //     this.showAlertMessage(1, `${this.contactToDelete.name} deleted successfully`);
    //   },
    //   error: (err) => {
    //     this.showAlertMessage(0,"Could not delete contact! Please try again later.");
    //     this.showSpinner = false;
    //     console.log("Error on delete contact", err.message);
    //   }
    // });
  }

  onEditContact(id : number) : void {
    this.router.navigateByUrl(`/contacts/${id}`);
  }

  toggleFavorite(contact : IContactList) : boolean{
    console.log(contact, "not implemented");
    return true;
  }

  onCellHover(event: CellMouseOverEvent) : void {
    const cells = this.gridApi.getCellRendererInstances({
      rowNodes : [event.node],
      columns : ["action"]
    });

    cells.forEach((cell: any) => {
      if (cell instanceof AgCellBtnGroupComponent) {
        cell.toggleVisibility(true);
      }
    });
  }

  onCellMouseOut(event : CellMouseOutEvent): void{
    const cells = this.gridApi.getCellRendererInstances({
      rowNodes : [event.node],
      columns : ["action"]
    });

    cells.forEach((cell: any) => {
      if (cell instanceof AgCellBtnGroupComponent) {
        cell.toggleVisibility(false);
      }
    });
  }

  getNavigationMessage(): void {
    //const nav = this.router.getCurrentNavigation(); // call in the construstor or get lost
    //this.message = nav?.extras?.state?.['message'];
    // OR
    const message : string = history.state?.message;    // can be called inside ngOnInit
    if(message){
      // display message
      this.showAlert = true;
      this.alertMessage = message;
      // clear message
      history.replaceState({},'');
    }
  }

  showAlertMessage(alert_type : number, message : string) : void {
    this.showAlert = true;
    this.alertMessage = message;
    this.alertType = alert_type;
  }

  ngOnDestroy(): void {
    this.getContactsSubscription?.unsubscribe();
  }

}
