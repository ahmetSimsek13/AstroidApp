import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule , Routes} from '@angular/router';
import { AstroidService } from './astroid.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { ChartComponent } from './chart/chart.component';
import { DataTablesModule } from 'angular-datatables';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule , MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {path: '', component: StartComponent},
  {path: 'chart', component: ChartComponent}];

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    DataTablesModule,
    MatSelectModule ,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AstroidService],
  bootstrap: [AppComponent]
})
export class AppModule { }
