import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContactList } from '../models/contact-list-request';
import { environment } from '../../../environments/environment.development';
import { ICreateContact } from '../models/create-contact-request';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


  getAllContacts(): Observable<IContactList[]>{
    return this.http.get<IContactList[]>(`${environment.baseApiUrl}/api/contacts`);
  }

  createNewContact(contact: ICreateContact): Observable<void>{
    return this.http.post<void>(`${environment.baseApiUrl}/api/contacts`,contact);
  }

}
