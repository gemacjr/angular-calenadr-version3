import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryClosureV3Component } from './components/delivery-closure-v3/delivery-closure-v3.component';
import { MonthTransformPipe } from './month-transform.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DeliveryClosureV3Component,
    MonthTransformPipe
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
