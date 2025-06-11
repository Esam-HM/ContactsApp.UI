import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IContactDetail } from '../models/contact-details';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";
import { AlertMessageComponent } from "../../../components/alert-message/alert-message.component";
import { ConfirmationModalComponent } from "../../../components/confirmation-modal/confirmation-modal.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, SpinnerComponent, AlertMessageComponent, ConfirmationModalComponent],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit, OnDestroy {
  id?: number;
  contact? : IContactDetail;
  bufferedContact? : IContactDetail;
  //
  isEdit: boolean = false;    // edit or cancel
  editText!: string; // edit text button
  //
  showSpinner : boolean = false;
  spinnerMessage: string = "";
  // alert message vairables
  alertMessage: string = "";
  showAlert : boolean = false;
  alertType : number = 0;
  //
  showConfirmBox : boolean = false;
  boxBtnsText : string[] = [];
  toDelete: boolean = false;

  // subscriptions
  routeParamsSubscription? : Subscription;
  getContactSubscription? : Subscription;
  updateContactSubscription? : Subscription;
  contactDeleteSubscription? : Subscription;
  translateSubscription? : Subscription; 

  constructor(private route: ActivatedRoute,
    private contactService: ContactService,
    private router : Router,
    private translateService: TranslateService
  ){}

  ngOnInit(): void {
    let _idParam : string | null = null; 

    this.routeParamsSubscription = this.route.paramMap.subscribe({
      next: (params) =>{
        _idParam = params.get("id");
      },
      error: (err) =>{
        console.log("Error when retrieve param from url");
      }
    });

    if(_idParam!=null){
      this.id = Number.parseInt(_idParam);
    }else{
      return;
    }

    this.translateService.get(["shared.Yes", "shared.No"]).subscribe(
      (translations) => {
        this.boxBtnsText = [translations["shared.Yes"],translations["shared.No"]];
      }
    );

    this.translateSubscription = this.translateService.onLangChange.subscribe(
      () => {
        this.toggleEditMode();
      }
    );

    this.getContactSubscription = this.contactService.getContactById(this.id).subscribe({
      next: (response) => {
        this.contact = response;
        this.bufferedContact = structuredClone(this.contact);
      },
      error: (err) =>{
        console.log("Error happened when retrieving contact", err.message);
      }
    });

  }

  onEditClicked(): void{
    this.isEdit = !this.isEdit;

    if(this.isEdit){
      //this.editText = "Cancel";
    }else{
      // cancel editing
      //this.editText = "Edit";
      this.contact = structuredClone(this.bufferedContact);
    }

    this.toggleEditMode();
  }

  onFavoriteClicked(): void{

  }

  onSubmit(): void{
    this.showSpinner = true;
    this.spinnerMessage = "Saving Changes...";
    if(this.contact && this.id){
      this.updateContactSubscription = this.contactService.updateContact(this.contact, this.id).subscribe({
        next: (response) =>{
          this.showSpinner = false;
          this.showAlertMessage(1,"Contact Changes Saved Successfully");
        },
        error: (err) => {
          this.showSpinner = false;
          this.showAlertMessage(0,"Failed to Save Contact Changes!. Please Try Again Later...");
          console.log("Error on submitting form. ", err.message);
        }
      });
    }

    // buffer new values
    this.bufferedContact = structuredClone(this.contact);
    this.onEditClicked();
  }

  onDeleteClicked() : void {
    if(this.id){
      this.showConfirmBox = true;
    }
  }

  deleteContact(): void{
    this.showConfirmBox= false;
    this.showSpinner=true;
    this.spinnerMessage = "Deleting Contact...";
    if(this.id){
      this.contactDeleteSubscription = this.contactService.deleteContact(this.id).subscribe({
        next: (response) => {
          this.showSpinner = false;
          console.log(response);
          this.navigateWithMessage();
        },
        error: (err) => {
          this.showAlertMessage(0,"messages.ContactUpdateFail");
          this.showSpinner = false;
          console.log("Error on delete contact", err.message);
        }
      });
    }
  }
  
  ngOnDestroy(): void {
    this.routeParamsSubscription?.unsubscribe();
    this.updateContactSubscription?.unsubscribe();
    this.getContactSubscription?.unsubscribe();
    this.contactDeleteSubscription?.unsubscribe();
    this.translateSubscription?.unsubscribe();
  }

  showAlertMessage(alert_type : number, translateKey: string) : void {
    this.translateService.get(translateKey).subscribe(
      translatedMessage => {
        this.alertMessage = translatedMessage;
      }
    );
    this.showAlert = true;
    this.alertType = alert_type;
  }

  navigateWithMessage(): void{
    let msg = "";
    this.translateService.get( "messages.ContactDltSuccess", { name : this.contact?.name}).subscribe(
      (translatedMsg) => {
        msg = translatedMsg;
      }
    );
    this.router.navigateByUrl("/contacts", {
      state : { message : msg}
    });
  }

  toggleEditMode() {
    const key = this.isEdit ? 'shared.Cancel' : 'shared.Edit';
    this.translateSubscription?.unsubscribe();
    this.translateSubscription = this.translateService.get(key).subscribe(res => {
      this.editText = res;
    });
  }

}
