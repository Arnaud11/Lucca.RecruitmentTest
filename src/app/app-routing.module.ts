import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './components/item/item.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ItemAddComponent } from './components/item-add/item-add.component';
import { ItemEditComponent } from './components/item-edit/item-edit.component';


const routes: Routes = [
  {
    path: 'items',
    component: ItemComponent,
    data: { title: 'Item List' }
  },
  {
    path: 'item-details/:id',
    component: ItemDetailComponent,
    data: { title: 'Item Details' }
  },
  {
    path: 'item-add',
    component: ItemAddComponent,
    data: { title: 'Item Add' }
  },
  {
    path: 'item-edit/:id',
    component: ItemEditComponent,
    data: { title: 'Item Edit' }
  },
  { path: '',
    redirectTo: '/items',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
