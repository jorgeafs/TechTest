import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './Share/Components/modal/modal.component';
import { CompaniesComponent } from './Components/companies/companies.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    CompaniesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
