import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContactList } from '../models/contact-list-request';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


  getAllContacts(): Observable<IContactList[]>{
    return this.http.get<IContactList[]>(`${environment.baseApiUrl}/api/contacts`);
  }

}
