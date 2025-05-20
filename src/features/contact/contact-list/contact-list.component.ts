import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { IContactList } from '../models/contact-list-request';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AlertMessageComponent } from "../../../components/alert-message/alert-message.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterLink, AlertMessageComponent],
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

  contactList?: IContactList[];
  showAlert : boolean = false;
  alertMessage : string = "";
  message : string = '';

  getContactsSubscription? : Subscription;


  ngOnInit(): void {
    this.getContactsSubscription = this.contactService.getAllContacts().subscribe({
      next: (response) => {
        this.contactList = response;
      },
      error: (err) => {
        console.log(err);
      }
    });
    
    this.getNavigationMessage();

  }

  getNavigationMessage(): void {
    //const nav = this.router.getCurrentNavigation();
    //this.message = nav?.extras?.state?.['message'];
    // OR
    const message : string = history.state?.message;
    if(message){
      // display message
      this.showAlert = true;
      this.alertMessage = message;
      // clear message
      history.replaceState({},'');
    }
  }

  onAlertShown(): void{
    this.showAlert = false;
  }

  ngOnDestroy(): void {
    this.getContactsSubscription?.unsubscribe();
  }


}
