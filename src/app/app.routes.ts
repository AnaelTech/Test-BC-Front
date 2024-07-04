import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './user/profil/profil.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { CrudUserComponent } from './admin/user/crud-user/crud-user.component';
import { ContentComponent } from './content/content.component';
import { FormEditComponent } from './admin/user/form-edit/form-edit.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: ContentComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'profil',
        component: ProfilComponent,
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: LoginAdminComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'employees',
        component: CrudUserComponent,
      },
      {
        path: 'employees/:id',
        component: FormEditComponent,
      },
    ],
  },
];
