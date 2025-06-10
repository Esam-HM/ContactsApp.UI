import { Routes } from '@angular/router';
import { ContactListComponent } from '../features/contact/contact-list/contact-list.component';
import { AddContactComponent } from '../features/contact/add-contact/add-contact.component';
import { EditContactComponent } from '../features/contact/edit-contact/edit-contact.component';
import { LoginComponent } from '../features/auth/login/login.component';
import { RegisterComponent } from '../features/auth/register/register.component';
import { authGuard } from '../features/auth/guards/auth.guard';
import { AccountComponent } from '../features/account/account/account.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full' 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'contacts',
        component: ContactListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'contacts/add',
        component: AddContactComponent,
        canActivate: [authGuard]
    },
    {
        path: 'contacts/:id',
        component: EditContactComponent,
        canActivate: [authGuard]
    },
    {
        path: '/account',
        component: AccountComponent
    }
];
