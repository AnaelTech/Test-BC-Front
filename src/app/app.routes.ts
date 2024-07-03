import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './user/profil/profil.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { CrudUserComponent } from './admin/user/crud-user/crud-user.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
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
        component: ProfilComponent,
        children: [
          {
            path: 'employees',
            component: CrudUserComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'employees',
    component: CrudUserComponent,
  },
];
