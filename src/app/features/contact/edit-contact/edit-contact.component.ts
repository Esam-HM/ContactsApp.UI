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

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent, AlertMessageComponent, ConfirmationModalComponent],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private contactService: ContactService,
    private router : Router
  ){}


  id?: number;
  contact? : IContactDetail;
  bufferedContact? : IContactDetail;
  //
  isEdit: boolean = false;    // edit or cancel
  editText : string = "Edit"; // edit text button
  //
  showSpinner : boolean = false;
  spinnerMessage: string = "";
  // alert message vairables
  alertMessage: string = "";
  showAlert : boolean = false;
  alertType : number = 0;
  //
  showConfirmBox : boolean = false;
  toDelete: boolean = false;

  // subscriptions
  routeParamsSubscription? : Subscription;
  getContactSubscription? : Subscription;
  updateContactSubscription? : Subscription;
  contactDeleteSubscription? : Subscription;

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
      this.editText = "Cancel";
    }else{
      // cancel editing
      this.editText = "Edit";
      this.contact = structuredClone(this.bufferedContact);
    }
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
          this.router.navigateByUrl("/contacts", {
            state : { message : `${this.contact?.name} Deleted Successfully.`}
          });
        },
        error: (err) => {
          this.showAlertMessage(0,"Could not delete contact! Please try again later.")
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
  }

  showAlertMessage(alertType : number, message: string) : void{
    this.showAlert = true;
    this.alertType = alertType;
    this.alertMessage = message;
  }



  // revertContactChanges(): void{
  //   if(this.contact && this.bufferedContact){
  //     this.contact.name = this.bufferedContact.name;
  //     this.contact.surname = this.bufferedContact.surname;
  //     this.contact.phoneNumber = this.bufferedContact.phoneNumber;
  //     this.contact.email = this.bufferedContact.email;
  //     this.contact.isFavorite = this.bufferedContact.isFavorite;
  //   }
  // }

  
  // saveContactChanges(): void{
  //   if(this.contact && this.bufferedContact){
  //     this.bufferedContact.name = this.contact.name;
  //     this.bufferedContact.surname = this.contact.surname;
  //     this.bufferedContact.phoneNumber = this.contact.phoneNumber;
  //     this.bufferedContact.email = this.contact.email;
  //     this.bufferedContact.isFavorite = this.contact.isFavorite;
  //   }

}
