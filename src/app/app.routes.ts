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
import { FormRegisterComponent } from './admin/user/form-register/form-register.component';
import { CrudPrestationComponent } from './admin/prestation/crud-prestation/crud-prestation.component';
import { FormEditPrestationComponent } from './admin/prestation/form-edit/form-edit-prestation.component';
import { FormRegisterPrestationComponent } from './admin/prestation/form-register/form-register-prestation.component';
import { PrestationListComponent } from './prestation/prestation-list/prestation-list.component';
import { adminGuard } from './service/admin.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleDetailComponent } from './article/article-detail/article-detail.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact-us/contact/contact.component';
import { CrudArticleComponent } from './admin/article/crud-article/crud-article.component';
import { FormEditArticleComponent } from './admin/article/form-edit/form-edit-article.component';
import { FormRegisterArticleComponent } from './admin/article/form-register/form-register-article.component';
import { CrudOrderComponent } from './admin/order/crud-order/crud-order.component';
import { FormEditOrderComponent } from './admin/order/form-edit-order/form-edit-order.component';
import { OrderHistoryComponent } from './user/order-history/order-history.component';

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
      {
        path: 'order-history',
        component: OrderHistoryComponent,
      },
      {
        path: 'prestations',
        component: PrestationListComponent,
      },
      {
        path: 'articles',
        component: ArticleListComponent,
        children: [],
      },
      {
        path: 'articles/:id',
        component: ArticleDetailComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'contact-us',
        component: ContactComponent,
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
        canActivate: [adminGuard],
      },
      {
        path: 'employees',
        component: CrudUserComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'employees/add',
        component: FormRegisterComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'employees/:id',
        component: FormEditComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'prestations',
        component: CrudPrestationComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'prestations/add',
        component: FormRegisterPrestationComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'prestations/:id',
        component: FormEditPrestationComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'articles',
        component: CrudArticleComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'articles/add',
        component: FormRegisterArticleComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'articles/:id',
        component: FormEditArticleComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'orders',
        component: CrudOrderComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'orders/:id',
        component: FormEditOrderComponent,
        canActivate: [adminGuard],
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
