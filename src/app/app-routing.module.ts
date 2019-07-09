import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';


const routes: Routes = [
  {
    path: 'categories-list',
    component: CategoriesListComponent,
    data: { title: 'List of Main Categories' }
  },
  {
    path: 'category-details/:id',
    component: CategoryDetailsComponent,
    data: { title: 'List of Main Categories' }
  },
  {
    path: '',
    redirectTo: '/categories-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
