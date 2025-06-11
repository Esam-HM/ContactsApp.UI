import { Component, OnDestroy } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ICreateContact } from '../models/create-contact-request';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { AlertMessageComponent } from '../../../components/alert-message/alert-message.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule, SpinnerComponent, AlertMessageComponent],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent implements OnDestroy{

  constructor(private contactService: ContactService,
     private router: Router,
     private translateService: TranslateService
  ){}

  displayLoading: boolean = false;
  showAlert : boolean = false;
  isSaved : boolean = false;
  alertMessage : string = '';

  newContact: ICreateContact = {
    name: '',
    surname : null,
    phoneNumber: null,
    email: null,
    isFavorite: false
  };

  createContactSubscription? : Subscription;

  onSubmit(): void {
    this.displayLoading = !this.displayLoading;
    this.createContactSubscription = this.contactService.createNewContact(this.newContact).subscribe({
      next: (response) => {
        console.log("Contact created successfully");
        this.displayLoading= false;
        this.showAlertMessage("messages.ContactAddSuccess");
        this.resetForm();
      },
      error: (err) =>{
        console.log(`Error Happened: ${err.message}`);
        this.displayLoading= false;
        this.showAlertMessage("messages.ContactAddFail");
      }
    }); 
  }

  onAlertShown() : void {
    this.showAlert = false;
  }

  resetForm():void{
    this.newContact.name="";
    this.newContact.surname= null;
    this.newContact.phoneNumber=null;
    this.newContact.email=null;
  }

  returnBack(): void{
    this.router.navigateByUrl("/contacts");
  }

  ngOnDestroy(): void {
    this.createContactSubscription?.unsubscribe();
  }

  showAlertMessage(translateKey: string) : void {
    this.translateService.get(translateKey).subscribe(
      translatedMessage => {
        this.alertMessage = translatedMessage;
      }
    );
    this.showAlert = true;
  }

}
