import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContactList } from '../models/contact-list-request';
import { environment } from '../../../environments/environment.development';
import { ICreateContact } from '../models/create-contact-request';
import { IContactDetail } from '../models/contact-details';
import { IContact } from '../models/contact';

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

  getContactById(id:number): Observable<IContactDetail>{
    return this.http.get<IContactDetail>(`${environment.baseApiUrl}/api/contacts/${id}`);
  }

  updateContact(updatedContact: IContactDetail, id: number) : Observable<IContact>{
    return this.http.put<IContact>(`${environment.baseApiUrl}/api/contacts/${id}`,updatedContact);
  }

  deleteContact(id: number): Observable<IContact>{
    return this.http.delete<IContact>(`${environment.baseApiUrl}/api/contacts/${id}`);
  }
  
}
