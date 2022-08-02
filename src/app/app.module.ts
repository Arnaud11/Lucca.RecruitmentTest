import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { ItemAddComponent } from './components/item-add/item-add.component';
import { ItemEditComponent } from './components/item-edit/item-edit.component';
import { SortDirective } from './directive/sort.directive';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemAddComponent,
    ItemEditComponent,
    SortDirective,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
