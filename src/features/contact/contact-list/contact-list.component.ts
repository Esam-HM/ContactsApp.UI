import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { IContactList } from '../models/contact-list-request';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {

  constructor(private contactService: ContactService) {}

  contactList?: IContactList[];


  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe({
      next: (response) => {
        this.contactList = response;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
