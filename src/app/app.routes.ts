import { Routes } from '@angular/router';
import { ContactListComponent } from '../features/contact/contact-list/contact-list.component';
import { AddContactComponent } from '../features/contact/add-contact/add-contact.component';
import { EditContactComponent } from '../features/contact/edit-contact/edit-contact.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full'
    },
    {
        path: 'contacts',
        component: ContactListComponent
    },
    {
        path: 'contacts/add',
        component: AddContactComponent
    },
    {
        path: 'contacts/:id',
        component: EditContactComponent
    }
];
