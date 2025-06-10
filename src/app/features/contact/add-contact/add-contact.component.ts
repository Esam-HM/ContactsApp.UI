import { Component, OnDestroy } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ICreateContact } from '../models/create-contact-request';
import { CommonModule } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../../components/spinner/spinner.component';
import { AlertMessageComponent } from '../../../components/alert-message/alert-message.component';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, SpinnerComponent, AlertMessageComponent],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent implements OnDestroy{

  constructor(private contactService: ContactService,
     private router: Router
  ){}

  displayLoading: boolean = false;
  showAlert : boolean = false;
  isSaved : boolean = false;
  alertMassege : string = '';

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
        this.showAlertBox(true, "Contact Saved Succcessfully");
        this.resetForm();
      },
      error: (err) =>{
        console.log(`Error Happened: ${err.message}`);
        this.displayLoading= false;
        this.showAlertBox(false,"Couldn't Save Contact. Try again later");
      }
    }); 
  }

  showAlertBox(isSaved: boolean, message:string): void{
    this.showAlert = true;
    this.isSaved = isSaved;
    this.alertMassege = message;
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

}
